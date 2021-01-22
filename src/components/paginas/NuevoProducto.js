import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {

    // Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);   
    // Hook para redireccionar
    const navigate = useNavigate();
    // validación y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            disponibilidad:true,
            disparador:false,
        }, 
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .min(3, 'Los productos deben tener al menos 3 caracteres')
                        .required('El Nombre del producto es obligatorio'),
            cantidad: Yup.number()
                        .min(1, 'Debes agregar una cantidad')
                        .required('La cantidad es obligatorio'),
            cantidadMinima: Yup.number()
                        .min(1, 'Debes agregar una cantidad')
                        .required('La cantidad es obligatorio'),
                        
        }),
        onSubmit: producto => {
            console.log("Entra");
            try {
                
                firebase.db.collection('productos').add(producto);
                // Redireccionar
                navigate('/productos');
            } catch (error) {
                console.log(error);
            }
        }
    });

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Agregar Producto</h1>

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
                                placeholder="Nombre producto"
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
                                placeholder="20"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidadMinima">Cantidad Minima del producto:</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="cantidadMinima"
                                type="number"
                                placeholder="10"
                                min="0"
                                value={formik.values.cantidadMinima}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.cantidadMinima && formik.errors.cantidadMinima ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.cantidadMinima} </p>
                            </div>
                        ) : null }

                        <input
                            type="submit"
                            className="bg-orange-800 hover:bg-red-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar producto"
                        />

                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NuevoProducto;