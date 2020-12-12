import React ,{useState,useEffect} from "react";
import firebase, { FirebaseContext } from './firebase';
import fire  from './firebase/config';
import { Routes, Route } from 'react-router';
import Login from './Login';
import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import NuevoRol from './components/paginas/NuevoRol';
import Roles from './components/paginas/Roles';
import Hero from './components/paginas/Hero';
import NuevoUsuario from './components/paginas/NuevoUsuario';
import NuevoProducto from './components/paginas/NuevoProducto';
import Productos from './components/paginas/Productos';
import Usuarios from './components/paginas/Usuarios';
import Sidebar from './components/ui/Sidebar';

const App = () => {
  const [user,setUser] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [hasAccount,sethasAccount] = useState('');
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };


  const handleLogin = () => {
    clearErrors();
    fire
    .auth()
    .signInWithEmailAndPassword(email,password)
    .catch(err =>{
      switch(err.code)
      {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;

      }
    });
  };

  const handleSignup = () => {
    clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch(err =>{
      switch(err.code)
      {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;

      }
    });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () =>{
    fire
    .auth()
    .onAuthStateChanged(user => 
      {
        if(user){
          clearInputs();
          setUser(user);
        }else {
          setUser("");
        }
      });
  };

  useEffect(() =>{
    authListener();
  },[]);
  return(
    
    <div className="App">
      {user ? (
        <FirebaseContext.Provider
        value={{
          firebase
        }}
      >
        <div className="md:flex min-h-screen">
            <Sidebar />
            <div className="md:w-2/5 xl:w-4/5 p-6">
              <Routes>
                  <Route path="/" element={<Ordenes />  } />
                  <Route path="/menu" element={<Menu />  } />
                  <Route path="/nuevo-platillo" element={<NuevoPlatillo />  } />
                  <Route path="/roles" element={<Roles />  } />
                  <Route path="/nuevo-rol" element={<NuevoRol />  } />
                  <Route path="/usuarios" element={<Usuarios />  } />
                  <Route path="/nuevo-usuario" element={<NuevoUsuario />  } />
                  <Route path="/nuevo-producto" element={<NuevoProducto />  } />
                  <Route path="/productos" element={<Productos />  } />         
              </Routes>
            </div>
            <Hero handleLogout={handleLogout}/>
        </div>
      </FirebaseContext.Provider>
      ):<Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      sethasAccount={sethasAccount}
      emailError={emailError}
      passwordError={passwordError}
    />} 
    </div>
  );  
};

export default App;