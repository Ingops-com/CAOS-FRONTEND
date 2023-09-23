import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsPlusCircle, BsFillEyeFill } from 'react-icons/bs'
import Cards from '../../../commons/cards/Cards';
import { Toaster } from 'react-hot-toast';
import { InvoicesContext } from '../../../../context/Buys/Invoice/InvoicesContext';
import { SupplierContext } from '../../../../context/Buys/Suppliers/SuppliersContext';


function Invoice() {


    const [permission, setPermission] = useState(false)
    const { getAllItemsById, dataItemInvoice} = useContext(InvoicesContext)


    function checkPermissions(permMin) {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user.role_id <= permMin) {
            setPermission(true)
        }
    }

    useEffect(() => {
        checkPermissions(1)
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const id = parts[parts.length - 1];
        getAllItemsById(id)
    }, [])

    return (
        <div className='invoiceBody'>

            <div className="cards">

                {/* aqui van las cards 1 para una para el dinero total 2 fecha de ultima compra 3 coste del inventario actual*/}
                <div className='w-full h-auto flex justify-center gap-4 mt-5 mb-5 items-center '>
                    <Cards
                        titleCard='PROVEEDOR'
                        bodyCard='0'
                        cardNum='card1'
                    />
                    <Cards
                        titleCard='FECHA DE CREACION'
                        bodyCard='00/00/0000'
                        cardNum='card2'
                    />
                    <Cards
                        titleCard='COSTE TOTAL'
                        bodyCard='0'
                        cardNum='card3'
                    />
                </div>
            </div>

            {/* tabla de facturas */}
            <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                <div className=' w-full max-h-96 overflow-auto'>
                    <table className='w-full '>
                        <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                            <tr>
                                <th className='thwhite dark:th'>Id Item</th>
                                <th className='thwhite dark:th'>Id factura</th>
                                <th className='thwhite dark:th'>Nombre</th>
                                <th className='thwhite dark:th'>Cantidad</th>
                                <th className='thwhite dark:th'>Medida</th>
                                <th className='thwhite dark:th'>Cantidad</th>
                                <th className='thwhite dark:th'>Creada en</th>
                                <th className='thwhite dark:th'>Ultima edicion</th>
                                <th className='thwhite dark:th'>Acciones</th>
                            </tr>
                        </thead >
                        <tbody >
                            
                            { dataItemInvoice.map((invoice) => (
                                    <tr key={invoice.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.id_invoice}</td>
                                        <td>{invoice.name}</td>
                                        <td>{invoice.quantity}</td>
                                        <td>{invoice.measure}</td>
                                        <td>{invoice.amount}</td>
                                        <td>{invoice.createdAt}</td>
                                        <td>{invoice.updatedAt}</td>
                                        <td>
                                            {
                                                permission && (
                                                    <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                        onClick={() => {

                                                        }}
                                                    ><BsFillTrashFill color='ffffff' /></button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Invoice