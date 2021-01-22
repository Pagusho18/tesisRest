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
            email: '',
            password: '',
            passwordConfirmation: '',
            names: '',
            identification: '',
            phone: '',
            address: '',
            role: ''
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .required('El correo es obligatorio'),
            password: Yup.string()
                        .required('La contraseña es obligatoria'),
            passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales.')
                        .required('La confirmación de la contraseña es obligatoria'),
            names: Yup.string()
                        .min(3, 'Los nombres deben tener al menos 3 caracteres')
                        .required('El nombre del usuario es obligatorio'),
            identification: Yup.number()
                        .min(1, 'Debes agregar una cédula o RUC')
                        .required('La identificación es obligatoria'),
            phone: Yup.number()
                        .min(1, 'Debes agregar un número de teléfono')
                        .required('El teléfono es obligatorio'),      
            address: Yup.string()
                        .min(3, 'La dirección debe tener al menos 3 caracteres')
                        .required('La dirección es obligatoria'),   
            role: Yup.string()
                        .required('El rol es obligatorio'),   
        }),

        onSubmit: async(usuario) => {
            try {
                await firebase.user.createUserWithEmailAndPassword(usuario.email, usuario.password)
                    .then((res) => firebase.user.currentUser.sendEmailVerification().then(function () {
                        
                        try{
                            firebase.db.collection('usuarios').doc(res.user.uid).set({
                                identificacion: usuario.identification,
                                correo: usuario.email,
                                nombre: usuario.names,
                                telefono: usuario.phone,
                                direccion: usuario.address,
                                rol: usuario.role,
                                existencia: true
                            });
                        }catch(error){
                            console.log(error);
                        }

                // Redireccionar
                navigate('/usuarios');
            }, function (error) {
                //Alert.alert("Debe llenar todos los campos" + error);
              }))
              .catch((res) => alert(res)); 
            }catch (error) {
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Correo Electrónico</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="Correo electrónico"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.email && formik.errors.email ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.email} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.password && formik.errors.password ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.password} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirmar contraseña</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="passwordConfirmation"
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={formik.values.passwordConfirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.passwordConfirmation} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="names">Nombres</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="names"
                                type="text"
                                placeholder="Nombres"
                                value={formik.values.names}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.names && formik.errors.names ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.names} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identification">Identificación (Cédula o RUC)</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="identification"
                                type="number"
                                placeholder="Identificación"
                                min="0"
                                value={formik.values.identification}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.identification && formik.errors.identification ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.identification} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Teléfono</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="number"
                                placeholder="Teléfono"
                                min="0"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.phone && formik.errors.phone ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.phone} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Dirección</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                type="text"
                                placeholder="Dirección"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        { formik.touched.address && formik.errors.address ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.address} </p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Rol</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Seleccione un rol --</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Mesero">Mesero</option>
                            </select>
                            { formik.touched.role && formik.errors.role ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.role} </p>
                            </div>
                        ) : null }
                            {/* <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="role"
                                type="text"
                                placeholder="Rol Usuario"
                                value={formik.values.rol}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            /> */}
                        </div>
                        {/* { formik.touched.role && formik.errors.role ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.role} </p>
                            </div>
                        ) : null } */}

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