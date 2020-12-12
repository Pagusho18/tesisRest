import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Rol from '../ui/Rol';

const Roles = () => {

    // definir el state para los roles
    const [ roles, guadarRoles ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerRoles =  () => {
           firebase.db.collection('roles').onSnapshot(manejarSnapshot);
        }
        obtenerRoles();
    }, []);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const roles = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarRoles(roles);
    }


    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Roles</h1>
            <Link to="/nuevo-rol" className="bg-orange-800 hover:bg-red-900, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar rol
            </Link>

            {roles.map( rol => (
                <Rol
                    key={rol.id}
                    rol={rol}
                />
            ))}

        </>
     );
}
 
export default Roles;