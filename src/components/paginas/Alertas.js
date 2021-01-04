import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Alerta from '../ui/Alerta';

const Alertas = () => {

    // definir el state para los roles
    const [ alertas, guadarAlerta ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerAlertas =  () => {
           firebase.db.collection('alertas').onSnapshot(manejarSnapshot);
        }
        obtenerAlertas();
    }, []);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const alertas = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarAlerta(alertas);
    }


    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Alerta</h1>

            <Link to="/nueva-alerta" className="bg-orange-800 hover:bg-red-900, inline-block mb-5 p-2 text-white uppercase font-bold">
                
                Crear Nueva Alerta
            </Link>
            {alertas.map( alerta => (
                <Alerta
                    key={alerta.id}
                    alerta={alerta}
                />
            ))}

        </>
     );
}
 
export default Alertas;