import React from 'react';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    

    return ( 
        <div className="md:w-2/6 xl:w-1/5 bg-orange-800">
            <div className="p-6">

                <img id="Logo" src={"https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-b.png?alt=media&token=887d2785-8fe2-4617-af2b-01e4a25f5e33"} alt=" imagen logo" />
                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/">Ordenes</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/platos">Platos</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/usuarios">Usuarios</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/productos">Productos</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/alertas">Alertas</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/ordenes-historico">Historial de Ordenes</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/reservas"> Reservas</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact="true" to="/aforos">Aforo</NavLink>
                </nav>
            </div>
            <div className="w-full max-w-3xl">
            </div>
        </div>

        
     );
}

export default Sidebar;