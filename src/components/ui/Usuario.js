import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Usuarios = ({usuario}) => {

    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef(usuario.existencia);

    // context de firebase para cambios en la BD
    const { firebase } = useContext(FirebaseContext)

    const { id,  nombre, cedula , correo, telefono, rol, existencia } = usuario;


    // modificar el estado del usuario en firebase
    /*updateBookList: (id, data) => {
            let ref = firebaseDb.ref('NewBooks');
            return ref
            .child(id)
            .update(data)
            .then(() => ref.once('value'))
            .then(snapshot => snapshot.val())
            .catch(error => ({
                errorCode: error.code,
                errorMessage: error.message
            }));
        }*/


    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value === "true");

        try {
            firebase.db.collection('usuarios')
                .doc(id)
                .update({
                    existencia
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
                        <p className="text-gray-600 mb-4">Cedula: {''}
                            <span className="text-gray-700 font-bold"> {cedula}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">telefono: {''}
                            <span className="text-gray-700 font-bold"> {telefono}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Correo: {''}
                            <span className="text-gray-700 font-bold"> {correo}</span> 
                        </p>
                        <p className="text-gray-600 mb-4">Rol: {''}
                            <span className="text-gray-700 font-bold"> {rol}</span> 
                        </p>
                        <input
                            type="submit"
                            className="bg-orange-600 hover:bg-red-700 uppercase p-2 text-white font-bold"
                            value="Editar Usuario"
                        />
                        <input
                        type="submit"
                        className="bg-orange-600 hover:bg-red-700 uppercase p-2 m-10  text-white font-bold"
                        value="Eliminar Usuario"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Usuarios;