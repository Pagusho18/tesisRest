import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Platillo = ({platillo}) => {

    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(platillo.existencia);

    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)

    const { id,  nombre, imagen, existencia, categoria, precio, descripcion } = platillo;


    // modificar el estado del platillo en firebase
    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value === "true");
        try {
            firebase.db.collection('platos')
                .doc(id)
                .update({
                    existencia
                });
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        <img src={imagen} alt=" imagen platillo " />
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre} </p>
                        <p className="text-gray-600 mb-4">Categoría: {''}
                            <span className="text-gray-700 font-bold">{categoria.toUpperCase() }</span> 
                        </p>
                        <p className="text-gray-600 mb-4">{descripcion} </p>
                        <p className="text-gray-600 mb-4">Precio: {''}
                            <span className="text-gray-700 font-bold">$ {precio}</span> 
                        </p>
                        <input
                            type="submit"
                            className="bg-orange-600 hover:bg-red-700 uppercase p-2 text-white font-bold"
                            value="Editar Plato"
                        />
                        <input
                        type="submit"
                        className="bg-orange-600 hover:bg-red-700 uppercase p-2 m-10  text-white font-bold"
                        value="Eliminar Plato"
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Platillo;