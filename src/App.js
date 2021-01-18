import React ,{useState,useEffect} from "react";
import firebase, { FirebaseContext } from './firebase';
import fire  from './firebase/config';
import { Routes, Route } from 'react-router';
import Login from './Login';
import Ordenes from './components/paginas/Ordenes';
import OrdenesHistorico from './components/paginas/OrdenesHistorico';
import Platos from './components/paginas/Platos';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import Hero from './components/paginas/Hero';
import NuevoUsuario from './components/paginas/NuevoUsuario';
import NuevoProducto from './components/paginas/NuevoProducto';
import Productos from './components/paginas/Productos';
import Usuarios from './components/paginas/Usuarios';
import Alertas from './components/paginas/Alertas';
import Reservas from './components/paginas/Reservas';
import Aforos from './components/paginas/Aforos';
import Sidebar from './components/ui/Sidebar';

const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [ usuarios, guadarUsuarios ] = useState([]);
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

  useEffect(() => {
    const obtenerUsuarios =  () => {
       firebase.db.collection('usuarios').onSnapshot(manejarSnapshot);
    }
    obtenerUsuarios();
  }, []);
  
  function manejarSnapshot(snapshot) {
    const usuarios = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    // almacenar los resultados en el state
    guadarUsuarios(usuarios);
  }

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
    <div className="App static">
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
                  <Route path="/Platos" element={<Platos />  } />
                  <Route path="/nuevo-platillo" element={<NuevoPlatillo />  } />
                  <Route path="/usuarios" element={<Usuarios />  } />
                  <Route path="/nuevo-usuario" element={<NuevoUsuario />  } />
                  <Route path="/nuevo-producto" element={<NuevoProducto />  } />
                  <Route path="/productos" element={<Productos />  } />
                  <Route path="/alertas" element={<Alertas />  } />   
                  <Route path="/reservas" element={<Reservas />  } /> 
                  <Route path="/ordenes-historico" element={<OrdenesHistorico />  } />   
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