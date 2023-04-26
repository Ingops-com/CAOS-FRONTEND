import { useContext, useState, useRef, useEffect } from 'react';
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs'
import { InventoriesContext } from '../../../context/Inventories/InventoriesContext';
import Cards from '../../commons/cards/Cards.jsx'
import RawMaterialForm from './Forms/RawMaterialForm.jsx'
import RawMaterialFormEdit from './Forms/RawMaterialFormEdit.jsx'
import './Inventories.css'
import { Toaster } from 'react-hot-toast';
import CategoriesForm from './Forms/CategoriesForm.jsx';
import { InvenHistContext } from '../../../context/History/InvenHistContext';


function Inventories() {

    const { data, date, getAllInvRawMate, valTotalRawMate, showFormEdit, setShowFormEdit, setEditData, setshowFormNew, showFormNew, showFormCategorie, setShowFormCategorie, setData, datafilter, deleteById } = useContext(InventoriesContext)
    const { historyRaw, getHistInve } = useContext(InvenHistContext)
    const [search, setSearch] = useState("")
    const [permission, setPermission] = useState(false)

    function checkPermissions(permMin) {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user.role_id <= permMin) {
            setPermission(true)
        }
    }

    useEffect(() => {
        checkPermissions(1)
        getAllInvRawMate()

    }, [])

    const handleChange = e => {
        setSearch(e.target.value)
        filter(e.target.value)
    }

    const filter = (search) => {
        var results = datafilter.filter((element) => {
            if (element.raw_material.name.toLowerCase().includes(search.toLowerCase())) {
                return element
            }
        });
        setData(results)
    }

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
                    className="middle none center mr-3 rounded-lg bg-cyan-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-cyan-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-dark="true"
                    onClick={() => { setShowFormCategorie(!showFormCategorie) }}
                >
                    NUEVA CATEGORIA
                </button>

                <button
                    className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-dark="true"
                    onClick={() => { setshowFormNew(!showFormNew) }}
                >
                    NUEVA MATERIA PRIMA
                </button>
            </div>


            {/* Formulario nueva categoria */}

            <CategoriesForm showFormCategorie={showFormCategorie} />

            {/* Formulario nueva materia prima */}

            <RawMaterialForm showFormNew={showFormNew} />

            {/* Formulario nuevo Stock */}

            <RawMaterialFormEdit showFormEdit={showFormEdit} />

            <div className='relative'>
                <input type='text'
                    id='search'
                    className='peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                    value={search}
                    onChange={handleChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Buscar Materia prima
                </label>
            </div>

            {/* Tabla de contenido */}
            <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
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
                            {
                            data.map((materia) => (
                                <tr key={materia.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                    <td>{materia.raw_material.name}</td>
                                    <td>{materia.stock}</td>
                                    <td>{materia.raw_material.unit_measure.name}</td>
                                    <td>{materia.price}</td>
                                    <td>

                                        {
                                            permission && (
                                                <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                    onClick={() => {
                                                        deleteById(materia.id)
                                                    }}
                                                ><BsFillTrashFill color='ffffff' /></button>
                                            )
                                        }

                                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                                            setShowFormEdit(true)
                                            setEditData(materia)
                                        }} ><BsPlusCircle color='ffffff' /></button>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tabla del historial */}
            <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
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
                            {console.log(historyRaw)}
                            {/* {historyRaw.map((a) => (
                                
                                <p>{a}</p>
                            ))
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Inventories

