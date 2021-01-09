import React, { useContext, useRef ,useState} from 'react';
import { FirebaseContext } from '../../firebase';

const Producto = ({producto}) => {
    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(producto.disponibilidad);
    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)
    const [nuevaCantidad, setCantidad] = useState(0);
    const { id,  nombre, descripcion,cantidad, disponibilidad } = producto;

    // modificar el estado del producto en firebase
    const actualizarDisponibilidad = () => {
        const disponibilidad = (existenciaRef.current.value === "true");
        try {
            firebase.db.collection('productos')
                .doc(id)
                .update({
                    disponibilidad
                });
        } catch (error) {
            console.log(error);
        }
    }

    const v1=parseInt(cantidad);
    const v2=parseInt(nuevaCantidad);
    const nuevoTotal=v1+v2;
    console.log(nuevoTotal);

    const actualizarCantidad = () => {

        try {
            firebase.db.collection('productos')
                .doc(id)
                .update({
                    cantidad:nuevoTotal
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
                        <p className="text-gray-600 mb-4">{descripcion} </p>
                        <p className="text-gray-600 mb-4">Actual Cantidad: {''}
                            <span className="text-gray-700 font-bold"> {cantidad}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Nueva Cantidad: {''}
                        <input
                        type="number"
                        className="text-gray-700 font-bold shadow appearance-none border"
                        onChange={event => setCantidad(event.target.value)}
                        >
                        </input>

                        </p>
                        <input
                            type="submit"
                            className="bg-orange-600 hover:bg-red-700 uppercase p-2 text-white font-bold"
                            value="Agregar Nueva Cantidad"
                            onClick={ () => actualizarCantidad()}
                            
                        />
                    </div>
                    <input
                        type="submit"
                        className="bg-orange-600 hover:bg-red-700 uppercase p-2 m-20  text-white font-bold"
                        value="Eliminar Porcion"
                        onClick={ () => actualizarDisponibilidad() }

                    />
                </div>

            </div>
        </div>
     );
}
 
export default Producto;