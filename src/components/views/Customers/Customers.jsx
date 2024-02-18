import {  BsFillEyeFill } from 'react-icons/bs'
import { Toaster } from 'react-hot-toast';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomersContext } from '../../../context/Customers/CustomersContext';


function Customers() {

    const { allCustomers, getAllCustomers } = useContext(CustomersContext)

    useEffect(() => {
        getAllCustomers()
    }, [])


    return (
        <div className="customersbody">
            <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                <div className=' w-full max-h-[50rem] overflow-auto'>
                    <table className='w-full '>
                        <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                            <tr>
                                <th className='thwhite dark:th'>Nombre</th>
                                {/*<th className='thwhite dark:th'>Telefono</th>*/}
                                <th className='thwhite dark:th'>Email</th>
                                <th className='thwhite dark:th'>Ciudad</th>
                                <th className='thwhite dark:th'>Direccion</th>
                                <th className='thwhite dark:th'>Fecha ultimo movimiento</th>
                                <th className='thwhite dark:th'>Detalles</th>
                            </tr>
                        </thead >
                        <tbody >
                            {
                                allCustomers.map((customer) => {
                                    <tr key={customer.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                        <td>{customer.name}</td>
                                        {/*<td>{customer.phone}</td>*/}
                                        <td>{customer.email}</td>
                                        <td>{customer.city}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.updatedAt}</td>
                                        <td>
                                            <Link to={`../customers/${customer.id}`}>
                                                <button className='bg-blue-500 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillEyeFill color='ffffff' /> </button>
                                            </Link>
                                        </td>
                                    </tr>})
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Customers