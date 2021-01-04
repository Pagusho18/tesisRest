import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';
const Alerta = ({alerta}) => {
    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(alerta.disponibilidad);
    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)
    const { id,  nombre, producto,descripcion,cantidad, disponibilidad } = alerta;
    // modificar el estado del alertas en firebase
    const actualizarDisponibilidad = () => {
        const disponibilidad = (existenciaRef.current.value === "true");
        try {
            firebase.db.collection('alertas')
                .doc(id)
                .update({
                    disponibilidad
                });
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre} </p>
                        <p className="text-gray-600 mb-4">Cantidad: {''}
                            <span className="text-gray-700 font-bold"> {cantidad}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Contenido Alerta: {''}
                            <span className="text-gray-700 font-bold"> {descripcion}</span> 
                        </p>
                                <label className="block mt-5 sm:w-2/4">
                                    <span className="text-gray-600 mb-4 " >Existencia: </span>
                                    <select 
                                        className="bg-white shadow appearance-none border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  "
                                        value={disponibilidad}
                                        ref={existenciaRef}
                                        onChange={ () => actualizarDisponibilidad() }
                                    >
                                        <option value="true">Disponible</option>
                                        <option value="false">No Disponible</option>
                                    </select>
                                </label>
                    </div>
                    <input
                            type="submit"
                            className="bg-orange-600 hover:bg-red-700 uppercase p-2 m-20 text-white font-bold"
                            value="Editar Alerta"
                        />
                </div>

            </div>
        </div>
     );
}
 
export default Alerta;