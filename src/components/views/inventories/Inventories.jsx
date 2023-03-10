import React, { useEffect, useState } from 'react';
import Cards from '../../commons/cards/Cards.jsx'
import {RawMaterial, AllInventories} from '../../../services/inventoriesServices.jsx'
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'


function Inventories() {

    const [data, setData] = useState([]);
    const [invValuTotal, setInvValuTotal] = useState(0);
    const [date, setDate ] = useState(0);
    
    useEffect(() => {
        let key = localStorage.getItem('key')
        RawMaterial(key.replace(/['"]+/g, '')).then((res) => {
            setData(res.data);
        })
        AllInventories
    }, [])
    
    useEffect(()=>{
        let total = 0
        data.forEach((dataPrice) => {
            total += dataPrice.price
        });
        setInvValuTotal(total)
    })

    return (
        <div className='inventoriesBody'>
            {console.log(data)}
            <div className='w-full h-auto flex justify-center gap-4 items-center p-5'> {/* Container  */}
                <Cards
                    titleCard='VALOR NETO INVENTARIO'
                    bodyCard={invValuTotal}
                    cardNum='card1'
                />
                <Cards
                    titleCard='FECHA ULTIMO INVENTARIO'
                    bodyCard='12 FEBRERO 2022'
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
                <table className='w-full'>
                    <thead className='border-4 border-transparent border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead >
                    <tbody >
                        {data.map((materia, index) => (
                            <tr key={index} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                <td>{materia.raw_material.name}</td>
                                <td>{materia.stock}</td>
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
    )
}

export default Inventories