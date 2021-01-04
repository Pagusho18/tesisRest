import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const NuevaAlerta = () => {

    // Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);   
    // Hook para redireccionar
    const navigate = useNavigate();
    // validación y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            descripcion: '',
        }, 
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .min(3, 'Las Alertas deben tener al menos 3 caracteres')
                        .required('El Nombre de la alerta es obligatorio'),
            descripcion: Yup.string()
                        .min(10, 'La descripción debe ser más larga')
                        .required('La descripción es obligatoria'),
            cantidad: Yup.number()
                        .min(1, 'Debes agregar una cantidad')
                        .required('La cantidad es obligatorio'),
                        
        }),
        onSubmit: alerta => {
            console.log("Entra");
            try {
                firebase.db.collection('alertas').add(alerta);
                // Redireccionar
                navigate('/alertas');
            } catch (error) {
                console.log(error);
            }
        }
    });

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Crear Alerta</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre Alerta"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.nombre} </p>
                            </div>
                        ) : null }
                                                <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">Cantidad</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cantidad"
                                type="number"
                                placeholder="Cantidad minima de producto"
                                min="0"
                                value={formik.values.cantidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.cantidad && formik.errors.cantidad ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.cantidad} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                            <textarea 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="descripcion"
                                placeholder="Contenido Correo Alerta"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>

                        { formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.descripcion} </p>
                            </div>
                        ) : null }
                        <input
                            type="submit"
                            className="bg-orange-800 hover:bg-red-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar Alerta"
                        />

                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NuevaAlerta;