import React, { useContext} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';


const NuevoUsuario = () => {

    // Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // Hook para redireccionar
    const navigate = useNavigate();

    // validación y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            cedula: '',
            telefono: '',
            correo: '',
        }, 
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .min(3, 'Los nombres deben tener al menos 3 caracteres')
                        .required('El Nombre del usuario es obligatorio'),
            cedula: Yup.number()
                        .min(1, 'Debes agregar una cedula o ruc')
                        .required('El documento es obligatorio'),
            telefono: Yup.number()
                        .min(1, 'Debes agregar un número')
                        .required('El telefono es obligatorio'),
            correo: Yup.string()
                        .required('El correo es obligatorio'),
                        
        }),
        onSubmit: usuario => {
            try {
                usuario.existencia = true;
                firebase.db.collection('usuarios').add(usuario);
                // Redireccionar
                navigate('/usuarios');
            } catch (error) {
                console.log(error);
            }
        }
    });
    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Agregar Usuario</h1>

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
                                placeholder="Nombre Usuario"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">Cedula o Ruc</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cedula"
                                type="number"
                                placeholder="Cedula o Ruc"
                                min="0"
                                value={formik.values.cedula}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.cedula && formik.errors.cedula ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.cedula} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">Telefono</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="telefono"
                                type="number"
                                placeholder="Numero de telefono movil"
                                min="0"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.telefono && formik.errors.telefono ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.telefono} </p>
                            </div>
                        ) : null }



                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">Correo</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="correo"
                                type="text"
                                placeholder="Correo Usuario"
                                value={formik.values.correo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.correo && formik.errors.correo ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.correo} </p>
                            </div>
                        ) : null }


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rol">Rol</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="rol"
                                type="text"
                                placeholder="Rol Usuario"
                                value={formik.values.rol}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.rol && formik.errors.rol ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.rol} </p>
                            </div>
                        ) : null }

                        <input
                            type="submit"
                            className="bg-orange-800 hover:bg-red-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar Usuario"
                        />
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NuevoUsuario;