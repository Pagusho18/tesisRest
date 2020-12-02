import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Combo = ({ combo }) => {

    const existenciaRef = useRef(combo.existencia);
    const { firebase } = useContext(FirebaseContext);

    return ( 
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold"> {combo.id} </h1>
                {combo.combo.map( platillos => (
                    <p className="text-gray-600"> {platillos.cantidad} {platillos.nombre} </p>
                ) )}
                <p className="text-gray-700 font-bold">Total a Pagar: $ {combo.total}</p>
            </div>
        </div>
     );
}
 
export default Combo;