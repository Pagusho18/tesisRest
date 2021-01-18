import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Reserva = ({reserva}) => {
    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(reserva.activo);
    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)
    const { id,  detail,pendingAprobe, activo,diahorareserva,email, nombre,personas,phone } = reserva;



    // modificar el estado del alertas en firebase
    const actualizarDisponibilidad = () => {
        const activo = (existenciaRef.current.value === "true");
        try {
            firebase.db.collection('reservas')
                .doc(id)
                .update({
                    activo,
                    pendingAprobe:activo
                    
                });
        } catch (error) {
            console.log(error);
        }
    }


    const CancelarDisponibilidad = () => {
        try {
            firebase.db.collection('reservas')
                .doc(id)
                .update({
                    activo:false,
                    pendingAprobe:false
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
                        <p className="text-gray-600 mb-4">Cantidad de personas: {''}
                            <span className="text-gray-700 font-bold"> {personas}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Telefono: {''}
                            <span className="text-gray-700 font-bold"> {phone}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Correo: {''}
                            <span className="text-gray-700 font-bold"> {email}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Fecha de la reserva: {''}
                            <span className="text-gray-700 font-bold"> {diahorareserva}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Detalle: {''}
                            <span className="text-gray-700 font-bold"> {detail}</span> 
                            
                        </p>

                        <label className="block mt-5 sm:w-2/4">
                                    <span className="text-gray-600 mb-4 " >Respuesta: </span>
                                    <select 
                                        className="bg-white shadow appearance-none border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  "
                                        value={activo}
                                        ref={existenciaRef}
                                        onChange={ () => actualizarDisponibilidad() }
                                    >
                                        <option value="true">Aceptar</option>
                                        <option value="false">No Aceptar</option>
                                    </select>
                        </label>


                    </div>
                </div>
                <input
                        type="submit"
                        className="bg-orange-600 hover:bg-red-700 uppercase p-2 m-10  text-white font-bold"
                        value="Reserva Completa"
                        onClick={ () => CancelarDisponibilidad() }
                        />
            </div>
            
        </div>
     );
}
 
export default Reserva;