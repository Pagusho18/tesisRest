import React from 'react';


const Login = (porps) => {

    const {email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,sethasAccount,emailError,passwordError } = porps;
    return(
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">      
                <img id="Logo" src={"https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c"} alt=" imagen logo" />
                <div>           
                </div>
                <section className="login text-3xl font-light mb-4" >
                    <div className='LoginContainer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <label className="block text-red-700 text-sm font-bold mb-2">Usuario</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" 
                            autoFocus 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value )} 
                        />
                        
                        <p className="errorMsg font-bold">{emailError}</p>
                        <label className="block text-red-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"  
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value )} 
                        />
                        <p className="errorMsg font-bold">{passwordError}</p>
                        <div className="btnContainer">
                        {hasAccount ? (
                            <>
                                <buttom onClick={handleSignup} >Registrate</buttom>
                                <p className="font-bold">
                                    ¿Ya tienes una cuenta?{""} 
                                </p> <buttom onClick={() => sethasAccount(!hasAccount)} >Entrar</buttom>
                            </>
                            ) : (
                            <>
                                <p className="font-bold"></p>
                                <button id="btnLogin" onClick={handleLogin} 
                                className="bg-orange-800 hover:bg-red-900 w-full mt-5 p-2 text-white uppercase font-bold" >Entrar</button>
                            </>
                        )}
                        </div>
                     </div>
                </section>
            </div>
        </div>
    )
};
export default Login;

