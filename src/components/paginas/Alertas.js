import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Producto from '../ui/Producto';

const Productos = () => {

    // definir el state para los roles
    const [ productos, guadarProducto ] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    // consultar la base de datos al cargar
    useEffect(() => {
        const obtenerProductoActivo =  () => {
           firebase.db.collection('productos').where('disponibilidad', "==", true).where('disparador', "==", true).onSnapshot(manejarSnapshot);
        }
        obtenerProductoActivo();
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
            <h1 className="text-3xl font-light mb-4">Productos con bajo stock </h1>
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