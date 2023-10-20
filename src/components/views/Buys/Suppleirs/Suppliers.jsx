import { Toaster } from 'react-hot-toast';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsBellSlashFill, BsFillBellFill, BsPencilFill } from 'react-icons/bs'
import { SupplierContext } from '../../../../context/Buys/Suppliers/SuppliersContext'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SupplierFormNew from '../Forms/SupplierFormNew';
import SupplierFormEdit from '../Forms/SupplierFormEdit';


function Suppliers() {

    const { dataSuppliers, getAllSuppleirs, updateStateSupplier, deleteSupplier, setDataEdit } = useContext(SupplierContext)
    const [permission, setPermission] = useState(false)

    useEffect(() => {
        checkPermissions(1)
        getAllSuppleirs()
    }, [])

    function checkPermissions(permMin) {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user.role_id <= permMin) {
            setPermission(true)
        }
    }

    return (
        <div className="SuppliersView">
            <div><Toaster /></div>
            <div className="forms">
                <div className="createSupplier">
                    <SupplierFormNew />
                </div>
                <div className="createSupplier">
                    <SupplierFormEdit />
                </div>
            </div>
            <div className='transition ease-in-out mt-5 mb-5'>
                <Tabs>
                    <TabList>
                        <Tab>
                            Provedores activos
                        </Tab>
                        <Tab>
                            Provedores inactivos
                        </Tab>
                    </TabList>
                    {/* tabla provedores activos */}
                    <TabPanel>
                        <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                            <div className=' w-full max-h-96 overflow-auto'>
                                <table className='w-full '>
                                    <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                                        <tr>
                                            <th className='thwhite dark:th'>Nombre</th>
                                            <th className='thwhite dark:th'>Email</th>
                                            <th className='thwhite dark:th'>Numero de telefono</th>
                                            <th className='thwhite dark:th'>Acciones</th>
                                        </tr>
                                    </thead >
                                    <tbody >
                                        {
                                            dataSuppliers
                                                .filter(supplier => supplier.active === true)
                                                .map(supplier => (
                                                    <tr key={supplier.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                                        <td>{supplier.name}</td>
                                                        <td>{supplier.contact_email}</td>
                                                        <td>{supplier.contact_phone}</td>
                                                        <td>
                                                            {permission && (
                                                                <button
                                                                    className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                    onClick={() => {
                                                                        updateStateSupplier(supplier.id, supplier.active)
                                                                        console.log("entra")
                                                                    }}
                                                                >
                                                                    <BsBellSlashFill color='ffffff' />
                                                                </button>
                                                            )}
                                                            {permission && (
                                                                <button
                                                                    className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                    onClick={() => {
                                                                        setDataEdit(supplier)
                                                                    }}
                                                                >
                                                                    <BsPencilFill color='ffffff' />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {/* Tabla provedores inactivos */}
                        <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                            <div className=' w-full max-h-96 overflow-auto'>
                                <table className='w-full '>
                                    <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                                        <tr>
                                            <th className='thwhite dark:th'>Nombre</th>
                                            <th className='thwhite dark:th'>Email</th>
                                            <th className='thwhite dark:th'>Numero de telefono</th>
                                            <th className='thwhite dark:th'>Acciones</th>
                                        </tr>
                                    </thead >
                                    <tbody >
                                        {
                                            dataSuppliers
                                                .filter(supplier => supplier.active === false)
                                                .map(supplier => (
                                                    <tr key={supplier.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                                        <td>{supplier.name}</td>
                                                        <td>{supplier.contact_email}</td>
                                                        <td>{supplier.contact_phone}</td>
                                                        <td>
                                                            {permission && (
                                                                <button
                                                                    className='bg-green-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                    onClick={() => {
                                                                        updateStateSupplier(supplier.id, supplier.active)
                                                                    }}
                                                                >
                                                                    <BsFillBellFill color='ffffff' />
                                                                </button>
                                                            )}
                                                            {permission && (
                                                                <button
                                                                    className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                    onClick={() => {
                                                                        deleteSupplier(supplier.id)
                                                                    }}
                                                                >
                                                                    <BsFillTrashFill color='ffffff' />
                                                                </button>
                                                            )}
                                                            {permission && (
                                                                <button
                                                                    className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                    onClick={() => {
                                                                        setDataEdit(supplier)
                                                                    }}
                                                                >
                                                                    <BsPencilFill color='ffffff' />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default Suppliers