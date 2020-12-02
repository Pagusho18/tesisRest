import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Producto from '../ui/Producto';

const Productos = () => {

    // definir el state para los roles
    const [ productos, guadarProducto ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerProducto =  () => {
           firebase.db.collection('productos').onSnapshot(manejarSnapshot);
        }
        obtenerProducto();
    }, []);

    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // almacenar los resultados en el state
        guadarProducto(productos);
    }


    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Producto</h1>
            <Link to="/nuevo-producto" className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Producto
            </Link>

            {productos.map( producto => (
                <Producto
                    key={producto.id}
                    producto={producto}
                />
            ))}

        </>
     );
}
 
export default Productos;