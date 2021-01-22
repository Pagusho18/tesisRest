import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    
    return ( 
        <div className="md:w-2/6 xl:w-1/5 bg-orange-800">
            <div className="p-6">
                <img id="Logo" src={"https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-b.png?alt=media&token=887d2785-8fe2-4617-af2b-01e4a25f5e33"} alt=" imagen logo" />
                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact to="/ordenes">Órdenes</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/platos">Platos</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/usuarios">Usuarios</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/productos">Productos</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/alertas">Alertas</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/reservas"> Reservas</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/aforos">Aforo</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/historico">Historial de Órdenes</NavLink>
                </nav>
            </div>
            <div className="w-full max-w-3xl">
            </div>
        </div>
     );
}

export default Sidebar;