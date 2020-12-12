import React from 'react';

const Hero = ({handleLogout}) => {
    return(
     <section className="hero">
         <nav>        
             <button className="bg-orange-800 hover:bg-red-900 w-full mt-5 p-2 text-white uppercase font-bold" onClick={handleLogout}>Salir</button>
         </nav>

     </section>   
    );
};
export default Hero;