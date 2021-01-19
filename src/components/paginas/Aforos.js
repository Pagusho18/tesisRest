import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Aforo from '../ui/Aforo';

const Aforos = () => {

    // definir el state para los roles
    const [ aforos, guadarAforo ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerProductoActivo =  () => {
           firebase.db.collection('aforos').onSnapshot(manejarSnapshot);
        }
        obtenerProductoActivo();
    }, []);


    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const aforos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarAforo(aforos);
    }


    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Aforo</h1>
            {aforos.map( aforo => (
                <Aforo
                    key={aforo.id}
                    aforo={aforo}
                />
            ))}
        </>
     );
}
 
export default Aforos;