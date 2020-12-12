import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Usuario from '../ui/Usuario';

const Usuarios = () => {

    // definir el state para los usuarios
    const [ usuarios, guadarUsuarios ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerUsuarios =  () => {
           firebase.db.collection('usuarios').onSnapshot(manejarSnapshot);
        }
        obtenerUsuarios();
    }, []);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const usuarios = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarUsuarios(usuarios);
    }


    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Usuarios</h1>
            <Link to="/nuevo-usuario" className="bg-orange-800 hover:bg-red-900, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar usuario
            </Link>

            {usuarios.map( usuario => (
                <Usuario
                    key={usuario.id}
                    usuario={usuario}
                />
            ))}

        </>
     );
}
 
export default Usuarios;