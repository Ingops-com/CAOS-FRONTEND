import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { Toaster } from 'react-hot-toast';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BankAccountsContext } from '../../../../context/Buys/Banks/BankAccountsContext';
import  BanksFormEdit  from '../Forms/BanksFormEdit.jsx';
import BanksFormNew from '../Forms/BanksFromNew.jsx';
import BanksAccountsNew from '../Forms/BanksAccounts/BanksAccountsNew'

function BankAccounts() {

    const [permission, setPermission] = useState(false)
    const { dataBanks, getAllBanks, createBank, EditBank, deleteBank, setEditDataBank,getAllBankAccounts, dataAccounts, deleteBankAccounts} = useContext(BankAccountsContext)

    useEffect(() => {
        checkPermissions(1)
        getAllBanks()
        setEditDataBank([])
        getAllBankAccounts()
    }, [])

    function checkPermissions(permMin) {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user.role_id <= permMin) {
            setPermission(true)
        }
    }
    return (
        <div className="bodyBanks">
            <BanksFormEdit></BanksFormEdit> 
            <BanksFormNew></BanksFormNew>
            <BanksAccountsNew></BanksAccountsNew>
            <Tabs>
                <TabList>
                    <Tab>
                        Bancos asociados
                    </Tab>
                    <Tab>
                        Cuentas administrativas
                    </Tab>
                    <Tab>
                        Cuentas Empleados
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                        <div className=' w-full max-h-[50rem] overflow-auto'>
                            <table className='w-full '>
                                <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                                    <tr>
                                        <th className='thwhite dark:th'>id</th>
                                        <th className='thwhite dark:th'>Nombre</th>
                                        <th className='thwhite dark:th'>Acciones</th>
                                    </tr>
                                </thead >
                                <tbody >
                                    {
                                        dataBanks.map((Bank) => (
                                            <tr key={Bank.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                                <td>{Bank.id}</td>
                                                <td>{Bank.name}</td>
                                                <td>
                                                    {
                                                        permission && (
                                                            <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                onClick={() => {
                                                                    deleteBank(Bank.id)
                                                                }}
                                                            ><BsFillTrashFill color='ffffff' /></button>
                                                        )
                                                    }

                                                    <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                                                        setEditDataBank(Bank)
                                                    }} ><BsFillPencilFill color='ffffff' /></button>
                                                </td>
                                            </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                        <div className=' w-full max-h-[50rem] overflow-auto'>
                            <table className='w-full '>
                                <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                                    <tr>
                                        <th className='thwhite dark:th'>Banco</th>
                                        <th className='thwhite dark:th'>Numero de cuenta</th>
                                        <th className='thwhite dark:th'>Tipo</th>
                                        <th className='thwhite dark:th'>Dinero en cuenta</th>
                                        <th className='thwhite dark:th'>Acciones</th>
                                    </tr>
                                </thead >
                                <tbody >
                                    {
                                        dataAccounts
                                        .filter(account => account.owner === 0)
                                        .map((account) => (
                                            <tr key={account.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                                {/* <td>{account.bank.name}</td>  */}
                                                <td>{account.number}</td>
                                                <td>{account.type}</td>
                                                <td>{account.balance}</td>
                                                <td>
                                                    {
                                                        permission && (
                                                            <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                onClick={() => {
                                                                    deleteBankAccounts(account.id)
                                                                }}
                                                            ><BsFillTrashFill color='ffffff' /></button>
                                                        )
                                                    }

                                                    <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                                                        setEditDataBank(Bank)
                                                    }} ><BsFillPencilFill color='ffffff' /></button>
                                                </td>
                                            </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
                        <div className=' w-full max-h-[50rem] overflow-auto'>
                            <table className='w-full '>
                                <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                                    <tr>
                                        <th className='thwhite dark:th'>id</th>
                                        <th className='thwhite dark:th'>Nombre</th>
                                        <th className='thwhite dark:th'>Acciones</th>
                                    </tr>
                                </thead >
                                <tbody >
                                    {
                                        dataBanks.map((Bank) => (
                                            <tr key={Bank.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                                                {/* <td>{Bank.id}</td>
                                                <td>{Bank.name}</td>
                                                <td>
                                                    {
                                                        permission && (
                                                            <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                                                                onClick={() => {
                                                                    deleteBank()
                                                                }}
                                                            ><BsFillTrashFill color='ffffff' /></button>
                                                        )
                                                    }

                                                    <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                                                        setEditDataBank(Bank)
                                                    }} ><BsFillPencilFill color='ffffff' /></button>
                                                </td> */}
                                            </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default BankAccounts