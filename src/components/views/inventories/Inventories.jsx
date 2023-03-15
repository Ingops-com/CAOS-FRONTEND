import { useContext, useEffect } from 'react';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import { InventoriesContext } from '../../../context/InventoriesContext.jsx';
import Cards from '../../commons/cards/Cards.jsx'
import './Inventories.css'


function Inventories() {

    const { getAllRawMate, data, date, valTotalRawMate } = useContext(InventoriesContext)

    useEffect(() => {
        getAllRawMate()
    }, [])

    return (

        <div className='inventoriesBody'>
            <div className='w-full h-auto flex justify-center gap-4 items-center p-5'>
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
            <div className='buttons'>

            </div>
            <div className='flex w-full items-center justify-center shadow-xl p-5 dark:shadow-none dark:bg-dark-ing-800'>
                <div className=' w-full max-h-36 overflow-auto'>
                    <table className='w-full '>
                        <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead >
                        <tbody >
                            {data.map((materia, index) => (
                                <tr key={index} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                    <td>{materia.raw_material.name}</td>
                                    <td>{materia.stock}</td>
                                    <td>{materia.raw_material.unit_measure.name}</td>
                                    <td>{materia.price}</td>
                                    <td>
                                        <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillTrashFill color='ffffff' /></button>
                                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2'><BsPencilFill color='ffffff' /></button>
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