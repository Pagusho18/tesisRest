import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Orden from '../ui/Orden';


const Ordenes  = () => {

    // context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    const [ productos, guadarProducto ] = useState([]);

    // consultar la base de datos al cargar
    // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot1(snapshot) {
        const productos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        guadarProducto(productos);
    
    }

    

    // state con las ordenes
    const [ordenes, guardarOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = () => {
            firebase.db.collection('ordenes').where('completado', "==", false).onSnapshot(manejarSnapshot);
        }
        obtenerOrdenes();

        const obtenerProductoActivo =  () => {
            firebase.db.collection('productos').where('disponibilidad', "==", true).onSnapshot(manejarSnapshot1);
        }
        obtenerProductoActivo();
    }, []);

    function manejarSnapshot(snapshot) {
        const ordenes = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        guardarOrdenes(ordenes);
    } 

    const disparadorProductos = productos.map(x => x.disparador);
    var productosDisparados = disparadorProductos.includes(true);

    return ( 
        
        <>
        <div className="bg-red-600 text-center  ">
            {productosDisparados  && (
                    <p className="text-white uppercase font-medium">¡Alerta Cantidad de Productos!          
                    </p>
                )}
         </div>     

            <div className="sm:flex sm:flex-wrap -mx-3">
                {ordenes.map(orden => (
                    <Orden
                        key={orden.id}
                        orden={orden}
                    />
                ))}
            </div>
        </>
     );
}
 
export default Ordenes;