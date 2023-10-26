import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { Toaster } from 'react-hot-toast';
import { CustomersContext } from '../../../context/Customers/CustomersContext';


function CustomersDetails() {

    const [permission, setPermission] = useState(false)
    const { customerDetails, getCustomerById, deleteCustomer } = useContext(CustomersContext)
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const id = parts[parts.length - 1];

    useEffect(() => {

        checkPermissions(1)
        getCustomerById(id)

    }, [])


    function checkPermissions(permMin) {
        let user = JSON.parse(localStorage.getItem('userData'))
        if (user.role_id <= permMin) {
            setPermission(true)
        }
    }

    return (
        <div className='costumerDetails'>
            <div><Toaster /></div>

            <div className="datos-principales">
                <label >
                    {customerDetails.name}
                </label>
            </div>
            <div className="botones-acciones">
                {/* boton editar */}
                {/* <Link to={`../customers/${customer.id}`}>
                    <button className='bg-blue-500 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillPencilFill color='ffffff' /> </button>
                </Link> */}
                {
                    permission && (
                        <button className='bg-red-600 p-2 rounded-lg pr-4 pl-4 m-2'
                            onClick={() => {
                                deleteCustomer(customerDetails.id)

                            }}
                        ><BsFillTrashFill color='ffffff' /></button>
                    )
                }
            </div>
        </div>
    )
}

export default CustomersDetails