import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Reserva from '../ui/Reserva';

const Reservas = () => {

    // definir el state para los roles
    const [ reservas, guadarReserva ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerProductoActivo =  () => {
           firebase.db.collection('reservas')
           .where('activo', "==", true)
           .where('pendingAprobe', "==", true)
           .onSnapshot(manejarSnapshot);
        }
        obtenerProductoActivo();
    }, []);


    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const reservas = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarReserva(reservas);
    }


    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Reservas</h1>

            {reservas.map( reserva => (
                <Reserva
                    key={reserva.id}
                    reserva={reserva}
                />
            ))}
        </>
     );
}
 
export default Reservas;