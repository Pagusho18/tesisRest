import React, { useState, useContext,useEffect } from 'react';
import { FirebaseContext } from '../../firebase';


const Orden = ({ orden }) => {



    const [tiempoentrega, guardarTiempoEntrega] = useState(0);
    
    
    // Context de firebase
    const { firebase } = useContext(FirebaseContext);

    // define el tiempo de entrega en tiempo real
    const definirTiempo = id => {
        try {
            firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    tiempoentrega
                })
        } catch (error) {
            console.log(error);
        }
    }

    // Completa el estado de una orden

    const completarOrden = id => {
        try {
            firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    pendienteDespacho:true
                })
        } catch (error) {
            console.log(error);
        }
        
    }

    const despacharOrden = id =>
    {

        try {
            firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    completado:true
                })
        } catch (error) {
            console.log(error);
        } 
    }


    // const nombrePlatoOrden = orden.orden.map(x => x.nombre);
    // //console.log(nombrePlatoOrden);

        //     //Function definiton with passing two arrays 
        // function findCommonElement(array1, array2) { 

        //     // Loop for array1 
        //     for(let i = 0; i < array1.length; i++) { 

        //         // Loop for array2 
        //         for(let j = 0; j < array2.length; j++) { 

        //             // Compare the element of each and 
        //             // every element from both of the 
        //             // arrays 
        //             if(array1[i] === array2[j]) { 

        //                 // Return if common element found 
        //                 return true; 
        //             } 
        //         } 
        //     } 

        //     // Return if no common element exist 
        //     return false;
        // } 
        // document.write(findCommonElement(nombrePlatoOrden, nombrePlatoProducto))

    //     var result = nombrePlatoOrden.filter(function (o1) {
    //         return nombrePlatoProducto.some(function (o2) {
    //             return o1 === o2; // return the ones with equal id
    //        });
    //     });
    //     //console.log(result);
    //     // if(findCommonElement(nombrePlatoOrden, nombrePlatoProducto))
    //     // {
    //     //     try {
    //     //         firebase.db.collection('productos')
    //     //             .doc(id)
    //     //             .update({
    //     //                 cantidad:cantidad-1
    //     //             });
    //     //     } catch (error) {
    //     //         console.log(error);
    //     //     }
    //     // }
    return ( 
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                <h1 className="text-yellow-600 text-lg font-bold">Mesa: {orden.mesa} </h1>
                {orden.orden.map( platillos => (
                    <p className="text-gray-600"> {platillos.cantidad} {platillos.nombre} </p>
                ) )}
                <p className="text-gray-700 font-bold">Total a Pagar: $ {orden.total}</p>
                {orden.tiempoentrega === 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo de Entrega
                        </label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                            min="1"
                            max="20"
                            placeholder="20"
                            value={tiempoentrega}
                            onChange={ e => guardarTiempoEntrega( parseInt(e.target.value) ) }
                        />
                        <div className="mb-4">
                         <button
                            onClick={ () => definirTiempo(orden.id) }
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900  mt-5 p-2 text-white uppercase font-bold"
                        >
                            Definir Tiempo
                        </button>
                        </div>
                    </div>
                )}
                {orden.tiempoentrega > 0 && (
                    <p className="text-gray-700">Tiempo de Entrega:
                        <span className="font-bold"> {orden.tiempoentrega} Minutos</span>
                    </p>
                )}

                <h1 className="text-gray-600 text-lg font-bold">Forma de pago: {orden.formaPago} </h1>

                { !orden.completado && orden.tiempoentrega > 0 && (
                   
                    <div>
                    <button
                    type="button"
                    className="bg-blue-800 hover:bg-blue-700  mt-5 p-2 text-white uppercase font-bold"
                    onClick={ () => completarOrden( orden.id )}
                   >
                       Solicitar Despacho
                   </button>

                   <button
                    type="button"
                    className="bg-blue-800 hover:bg-blue-700  mt-5 p-2 text-white uppercase font-bold"
                    onClick={ () => despacharOrden( orden.id )}
                    >
                    Marcar como completa
                    </button>
                    </div>
                    
                   
                ) }
                


            </div>
            </div>
            </div>
            </div>
     );
}
 
export default Orden;