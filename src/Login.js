import React from 'react';
const Login = (porps) => {

    const {email,setEmail,password,setPassword,handleLogin,handleSignup,hasAccount,sethasAccount,emailError,passwordError } = porps;
    return(
        <div className="flex justify-center mt-10">
            <div className="w-full max-w-3xl">
                <section className="login text-3xl font-light mb-4" >
                    <div className='LoginContainer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" 
                            autoFocus 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value )} 
                        />
                        
                        <p className="errorMsg font-bold">{emailError}</p>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
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
                            <buttom onClick={handleLogin} >Entrar</buttom>
                            <p className="font-bold"> 
                            ¿No tienes cuenta aun? {""}
                            </p> <span onClick={() => sethasAccount(!hasAccount)}>Registrate</span>
                            </>
                            ) : (
                            <>
                            <buttom onClick={handleSignup} >Registrate</buttom>
                            <p className="font-bold">
                                ¿Ya tienes una cuenta?{""} 
                            </p> <span onClick={() => sethasAccount(!hasAccount)} >Entrar</span>
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