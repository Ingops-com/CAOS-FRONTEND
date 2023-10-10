import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsPlusCircle, BsFillPencilFill } from 'react-icons/bs'
import Cards from '../../../commons/cards/Cards';
import { Toaster } from 'react-hot-toast';
import { InvoicesContext } from '../../../../context/Buys/Invoice/InvoicesContext';
import { SupplierContext } from '../../../../context/Buys/Suppliers/SuppliersContext';
import ItemsInvoicesFromEdit from '../Forms/ItemsInvoicesFormEdit'

function InvoiceItems() {

    const [permission, setPermission] = useState(false)
    const { getAllItemsById, dataItemInvoice, ShowFormEdit,
        setShowFormEdit, setItemsEditData, getDataInvoiceByid, dataInvoice,
        deleteItemsInvoices, getAllInvoices } = useContext(InvoicesContext)
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const id = parts[parts.length - 1];


    useEffect(() => {

        checkPermissions(1)
        getAllItemsById(id)
        getDataInvoiceByid(id)

    }, [])

    useEffect(() => {
        getDataInvoiceByid(id)

    }, [dataItemInvoice])


    function checkPermissions(permMin) {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user.role_id <= permMin) {
            setPermission(true)
        }
    }

    return (
        <div className='invoiceBody'>

            {/* notificaciones */}
            <div><Toaster /></div>
            <div className="cards">
                {/* aqui van las cards 1 para una para el dinero total 2 fecha de ultima compra 3 coste del inventario actual*/}
                <div className='w-full h-auto flex justify-center gap-4 mt-5 mb-5 items-center '>
                    {console.log(dataInvoice)}
                    <Cards
                        titleCard='PROVEEDOR'
                        bodyCard={dataInvoice.length > 0 ? dataInvoice[0].supplier.name : ''}
                        cardNum='card1'
                    />
                    <Cards
                        titleCard='FECHA DE CREACION'
                        bodyCard={dataInvoice.length > 0 ? dataInvoice[0].createdAt : ''}
                        cardNum='card2'
                    />
                    <Cards
                        titleCard='COSTE TOTAL'
                        bodyCard={dataInvoice.length > 0 ? dataInvoice[0].amount : ''}
                        cardNum='card3'
                    />
                </div>
            </div>
            {/* formularios */}

            <ItemsInvoicesFromEdit></ItemsInvoicesFromEdit>

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
                                <th className='thwhite dark:th'>Precio unitario</th>
                                <th className='thwhite dark:th'>Creada en</th>
                                <th className='thwhite dark:th'>Ultima edicion</th>
                                <th className='thwhite dark:th'>Acciones</th>
                            </tr>
                        </thead >
                        <tbody >

                            {dataItemInvoice.map((itemInvoice) => (
                                <tr key={itemInvoice.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                    <td>{itemInvoice.id}</td>
                                    <td>{itemInvoice.id_invoice}</td>
                                    <td>{itemInvoice.name}</td>
                                    <td>{itemInvoice.quantity}</td>
                                    <td>{itemInvoice.measure}</td>
                                    <td>{itemInvoice.amount}</td>
                                    <td>{itemInvoice.createdAt}</td>
                                    <td>{itemInvoice.updatedAt}</td>
                                    <td>
                                        {
                                            permission && (
                                                <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                    onClick={() => {
                                                        deleteItemsInvoices(itemInvoice)

                                                    }}
                                                ><BsFillTrashFill color='ffffff' /></button>
                                            )
                                        }

                                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                                            setShowFormEdit(true)
                                            setItemsEditData(itemInvoice)
                                        }} ><BsFillPencilFill color='ffffff' /></button>
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

export default InvoiceItems