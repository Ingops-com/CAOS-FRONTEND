import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsPlusCircle } from 'react-icons/bs'
import { BuysContext } from '../../../context/Buys/BuysContext';
import Cards from '../../commons/cards/Cards';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Toaster } from 'react-hot-toast';
function Buys() {

  const { getAllInvoices, date, datafilter, dataInvoices, setDataInvoices } = useContext(BuysContext)
  const [permission, setPermission] = useState(false)


  function checkPermissions(permMin) {
    let user = JSON.parse(localStorage.getItem('userData'))
    if (user.role_id <= permMin) {
      setPermission(true)
    }
  }

  useEffect(() => {
    checkPermissions(1)
    getAllInvoices()
}, [])


  return (


    <div className="buysBody">

      <div className="cards">

        {/* aqui van las cards 1 para una para el dinero total 2 fecha de ultima compra 3 coste del inventario actual*/}
        <div className='w-full h-auto flex justify-center gap-4 mt-5 mb-5 items-center '>
          <Cards
            titleCard='DINERO TOTAL'
            bodyCard='0'
            cardNum='card1'
          />
          <Cards
            titleCard='FECHA ULTIMA COMPRA'
            bodyCard='00/00/0000'
            cardNum='card2'
          />
          <Cards
            titleCard='COSTE TOTAL DEL INVENTARIO'
            bodyCard='0'
            cardNum='card3'
          />
        </div>


      </div>

      {/* BOTONES */}

      {/* aqui van los formularios */}
      <div className='transition ease-in-out mt-5 mb-5'>
        {/* tabla de facturas */}
        <div className='flex w-full items-center justify-center shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800'>
          <div className=' w-full max-h-96 overflow-auto'>
            <table className='w-full '>
              <thead className=' border-b-slate-300 dark:text-slate-500 dark:border-b-slate-800 bg-transparent'>
                <tr>
                  <th className='thwhite dark:th'>Id factura</th>
                  <th className='thwhite dark:th'>Costo total</th>
                  <th className='thwhite dark:th'>Distribuidor</th>
                  <th className='thwhite dark:th'>Realizada en</th>
                  <th className='thwhite dark:th'>Acciones</th>
                </tr>
              </thead >
              <tbody >
                {
                  dataInvoices.map((invoice) => (
                    <tr key={invoice.id} className='text-center odd:bg-transparent even:bg-slate-200 dark:even:bg-dark-ing-700 dark:odd:bg-transparent dark:text-white'>
                      <td>{invoice.id}</td>
                      <td>{invoice.amount}</td>
                      <td>{invoice.supplier.name}</td>
                      <td>{invoice.createdAt}</td>
                      <td>
                        {
                          permission && (
                            <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                              onClick={() => {
                                
                              }}
                            ><BsFillTrashFill color='ffffff' /></button>
                          )
                        }

                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={() => {
                          // setShowFormEdit(true)
                          // setEditData(materia)
                        }} ><BsPlusCircle color='ffffff' /></button>
                      </td>
                    </tr>))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Buys