import { useContext, useEffect, useRef, useState } from "react";
import { SupplierContext } from "../../../../context/Buys/Suppliers/SuppliersContext";
import { UnitMeasuresContext } from "../../../../context/Inventories/Unite Measure/UnitMeasuresContext";
import { InvoicesContext } from "../../../../context/Buys/Invoice/InvoicesContext";
import { RawMateContext } from "../../../../context/Inventories/Raw Material/RawMateContext";
import Cards from '../../../commons/cards/Cards';
import { Toaster } from "react-hot-toast";

function InvoicesFormNew() {
    let totalValue
    //variable encargada de controlar los fomrularios que se muestran en pantalla
    const [numFormularios, setNumFormularios] = useState(0);
    //variable encargada de recolectar los datos de todos los formularios anteriormente creados
    const [datosFormularios, setDatosFormularios] = useState([]);
    const { dataSuppliers, getAllSuppleirs } = useContext(SupplierContext)
    const { JSONConvertItems, createInvoice, idInvoice } = useContext(InvoicesContext)
    const { getAllRawMaterial, dataAllRawMate } = useContext(RawMateContext)

    useEffect(() => {
        getAllSuppleirs()
        getAllRawMaterial()
    }, [])

    useEffect(() => {
        JSONConvertItems(datosFormularios)
    }, [idInvoice])

    const calcularValorTotal = () => {
        const total = datosFormularios.reduce((acc, item) => {
            const amount = parseFloat(item.amount) || 0;
            const quantity = parseFloat(item.quantity) || 0;
            return acc + (amount * quantity);
        }, 0);

        return total;
    };


    //funcion que se dispara en el momento de hacer click en el boton "agregar producto existente"
    const agregarFormulario = () => {
        setNumFormularios(numFormularios + 1);
        setDatosFormularios([...datosFormularios, {}]);
    };


    function handleSubmit(e) {
        e.preventDefault()
        totalValue = calcularValorTotal()
        let supplier = e.target.supplier.value
        let note = e.target.note.value
        createInvoice(totalValue, supplier, note, 1)

    }
    //Esta funcion se encarga de guardar los datos de los formularios al detectar cambios, respetando los datos previamente guardados. guarda los datos segun el index dado en el mapeo del formulario
    const handleChange = (index, field, value) => {
        const newDatosFormularios = [...datosFormularios];
        let parsedValue;
        if (value === '') {
          parsedValue = null; // O cualquier otro valor que desees para indicar que el campo está vacío
        } else {
          parsedValue = JSON.parse(value);
        }
        newDatosFormularios[index] = {
          ...newDatosFormularios[index],
          [field]: parsedValue
        };
        setDatosFormularios(newDatosFormularios);
        totalValue = calcularValorTotal();
      };
    return (
        <div className="container-primary">
            <div><Toaster /></div>
            <div className="distribuidor">

                {/* formulario encargado de recolectar datos para la creacion de items en la factura */}
                <form onSubmit={handleSubmit} className="flex gap-3 p-5 justify-center items-center" >
                    <div className="relative h-10 w-72 min-w-[200px]">
                        <select
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            id='supplier'
                        >
                            {/* mapeo encargado de insertar los proveedores registrados*/}
                            {dataSuppliers
                            .filter(supplier => supplier.active === true)
                            .map((supplier, index) => (
                                <option key={index} className="dark:bg-dark-ing-900" value={supplier.id}>{supplier.name}</option>
                            ))}
                        </select>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Proveedor
                        </label>
                    </div>
                    <div className="relative flex-1">
                        <input
                            id="note"
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Notas a tener en cuenta
                        </label>
                    </div>
                    <button
                        type="button"
                        className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-dark="true"
                        onClick={agregarFormulario}
                    >
                        Producto Existente
                    </button>

                    <button
                        className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-dark="true"
                    >
                        Registrar
                    </button>
                </form>
            </div>
            {/* se mapea la variable de numFormularios para general este fragmento de codigo por cada vez que se indique en el state */}
            {Array.from({ length: numFormularios }).map((_, index) => (
                <div key={index} className="formulario-producto-existente flex gap-3 pt-3">
                    <div className="relative flex-1">
                        <select
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            id={`product-${index}`}
                            value={JSON.stringify(datosFormularios[index]?.product || {})}
                            onChange={(e) => handleChange(index, 'product', e.target.value)}
                        >
                            <option>Seleccione una opción</option>
                            {dataAllRawMate.map((rawMate, index) => (
                                <option
                                    key={index}
                                    className="dark:bg-dark-ing-900"
                                    value={JSON.stringify({
                                        name: rawMate.name,
                                        id: rawMate.id,
                                        unit_measure_id: rawMate.unit_measure_id
                                    })}
                                >
                                    {rawMate.name}
                                </option>
                            ))}
                        </select>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Producto registrado
                        </label>
                    </div>
                    <div className="relative flex-1">
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id={`amount-${index}`}
                            value={datosFormularios[index]?.amount || ''}
                            onChange={(e) => handleChange(index, 'amount', e.target.value)}
                            type="number"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            valor Unitario
                        </label>
                    </div>
                    <div className="relative flex-1">
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            id={`quantity-${index}`}
                            value={datosFormularios[index]?.quantity || ''}
                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                            type="number"

                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Cantidad
                        </label>
                    </div>
                    <div className="relative flex-1">
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            readOnly
                            value={datosFormularios[index]?.product?.unit_measure_id || ''}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Unidad de medida
                        </label>
                    </div>
                </div>
            ))}
        </div>
    )

}


export default InvoicesFormNew