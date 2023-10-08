import React, { useContext, useEffect, useState } from 'react'
import { BsFillTrashFill, BsPlusCircle, BsFillEyeFill } from 'react-icons/bs'
import { BuysContext } from '../../../context/Buys/BuysContext';
import Cards from '../../commons/cards/Cards';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import { InvoicesContextProvider } from '../../../context/Buys/Invoice/InvoicesContext';
function Buys() {

  const { getAllInvoices, date, datafilter, dataInvoices, setDataInvoices } = useContext(BuysContext)
  const [permission, setPermission] = useState(false)

  function sumAmountForCurrentMonth() {
    // Obtén la fecha actual
    const currentDate = new Date();
  
    // Filtra los objetos que tengan la misma fecha de mes y año que la fecha actual
    const filteredData = dataInvoices.filter(item => {
      const itemDate = new Date(item.createdAt);
      return (
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear()
      );
    });
  
    // Suma los valores de "amount" de los objetos filtrados
    const totalAmount = filteredData.reduce((acc, item) => {
      return acc + parseFloat(item.amount);
    }, 0);
  
    return totalAmount;
  }
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
            bodyCard={date.createdAt}
            cardNum='card2'
          />
          <Cards
            titleCard='COSTE TOTAL DEL INVENTARIO'
            bodyCard={sumAmountForCurrentMonth()}
            cardNum='card3'
          />
        </div>


      </div>

      {/* BOTONES */}

      <div className='flex justify-center mt-5 mb-5'>
        <Link to={`../invoice/create`}>
        <button
          className="middle none center mr-3 rounded-lg bg-cyan-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-cyan-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
        >
          NUEVA FACTURA
        </button>
        </Link>
      </div>

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
                        <Link to={`../invoice/${invoice.id}`}>
                          <button className='bg-blue-500 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillEyeFill color='ffffff' /> </button>
                        </Link>
                      </td>
                    </tr>
                  ))
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