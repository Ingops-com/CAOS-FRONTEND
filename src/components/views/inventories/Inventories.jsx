import { useContext, useState, useRef } from 'react';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs'
import { InventoriesContext } from '../../../context/InventoriesContext.jsx';
import Cards from '../../commons/cards/Cards.jsx'
import RawMaterialForm from './RawMaterialForm/RawMaterialForm.jsx'
import RawMaterialFormEdit from './RawMaterialForm/RawMaterialFormEdit.jsx'
import './Inventories.css'
import { Toaster } from 'react-hot-toast';
import { CSSTransition } from 'react-transition-group';
import CategoriesForm from './RawMaterialForm/CategoriesForm.jsx';



function Inventories() {

    const { data, date, valTotalRawMate, active, setActive, setEditData } = useContext(InventoriesContext)
    const [showFormNew, setshowFormNew] = useState(false)
    const nodeRef = useRef(null);

    return (

        <div className='inventoriesBody'>

            {/* notificaciones */}
            <div><Toaster /></div>

            {/* tarjetas de datos */}
            <div className='w-full h-auto flex justify-center gap-4 mt-5 mb-5 items-center '>
                <Cards
                    titleCard='VALOR NETO INVENTARIO'
                    bodyCard={'$ ' + valTotalRawMate}
                    cardNum='card1'
                />
                <Cards
                    titleCard='FECHA ULTIMO INVENTARIO'
                    bodyCard={date.createdAt}
                    cardNum='card2'
                />
                <Cards
                    titleCard='CANTIDAD DE PRODUCTOS'
                    bodyCard={data.length}
                    cardNum='card3'
                />
            </div>

            {/* Boton nueva categoria */}
            <div className='flex justify-center mt-5 mb-5'>
                <button
                    className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-dark="true"
                    onClick={() => { setshowFormNew(!showFormNew) }}
                >
                    NUEVA MATERIA PRIMA
                </button>
            </div>

            {/* Formulario nueva categoria */}
            <CSSTransition
                nodeRef={nodeRef}
                in={showFormNew}
                timeout={500}
                classNames="container"
                unmountOnExit
                onEnter={() => { setActive(false) }}
            >
                <div ref={nodeRef} className='flex justify-center items-center'>
                    <RawMaterialForm />
                </div>
            </CSSTransition>
            <div className='flex justify-center mt-5 mb-5'>
                <button
                    className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-dark="true"
                    onClick={() => { setshowFormNew(!showFormNew) }}
                >
                    NUEVA MATERIA PRIMA
                </button>
            </div>

            {/* Formulario nueva materia prima */}
            <CSSTransition
                nodeRef={nodeRef}
                in={showFormNew}
                timeout={500}
                classNames="container"
                unmountOnExit
                onEnter={() => { setActive(false) }}
            >
                <div ref={nodeRef} className='flex justify-center items-center'>
                    <CategoriesForm />
                </div>
            </CSSTransition>
            
            {/* Formulario nuevo Stock */}
            <CSSTransition
                nodeRef={nodeRef}
                in={active}
                timeout={500}
                classNames="container"
                unmountOnExit
                onEnter={() => { setshowFormNew(false) }}
            >
                <div ref={nodeRef} className='flex justify-center items-center'>
                    <RawMaterialFormEdit />
                </div>
            </CSSTransition>


            {/* Tabla de contenido */}
            <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 dark:shadow-none dark:bg-dark-ing-800'>
                <div className=' w-full max-h-96 overflow-auto'>
                    <table className='w-full '>
                        <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                            <tr>
                                <th className='thwhite dark:th'>Nombre</th>
                                <th className='thwhite dark:th'>Cantidad</th>
                                <th className='thwhite dark:th'>Unidad de medida</th>
                                <th className='thwhite dark:th'>Precio total</th>
                                <th className='thwhite dark:th'>Acciones</th>
                            </tr>
                        </thead >
                        <tbody >
                            {data.map((materia) => (
                                <tr key={materia.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                    <td>{materia.raw_material.name}</td>
                                    <td>{materia.stock}</td>
                                    <td>{materia.raw_material.unit_measure.name}</td>
                                    <td>{materia.price}</td>
                                    <td>
                                        <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillTrashFill color='ffffff' /></button>
                                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                                            setActive(true)
                                            setEditData(materia)
                                        }} ><BsPlusCircle color='ffffff' /></button>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Inventories

