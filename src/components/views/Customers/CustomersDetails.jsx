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

    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target.name.value ? e.target.name.value : customerDetails.name
        let pet = e.target.pet.value ? e.target.pet.value : customerDetails.pet_name
        let phone = e.target.phone.value ? e.target.phone.value : customerDetails.phone
        let email = e.target.email.value ? e.target.email.value : customerDetails.email
        let city = e.target.city.value ? e.target.city.value : customerDetails.city
        let neighborhood = e.target.neighborhood.value ? e.target.neighborhood.value : customerDetails.neighborhood
        let locality = e.target.locality.value ? e.target.locality.value : customerDetails.locality
        let address = e.target.address.value ? e.target.address.value : customerDetails.address

        console.log(name, pet, phone, email, city, neighborhood, locality, address)


    }

    return (
        <div className='costumerDetails'>
            <div><Toaster /></div>

            <div className="botones-acciones flex items-end">
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
                        >Eliminar cliente</button>
                    )
                }

            </div>
            <div className="datos-principales">
                <form onSubmit={handleSubmit} >
                    <div className="flex gap-3 p-5 justify-center items-center">
                        <label htmlFor="name">
                            Nombre
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.name}
                            id='name'
                        />
                        <label htmlFor="pet">
                            Mascota
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.pet_name}
                            id='pet'
                        />
                        <label htmlFor="phone">
                            Telefono
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.phone}
                            id='phone'
                        />
                        <label htmlFor="email">
                            Correo
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.email}
                            id='email'
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <h2 className=''>DATOS DE ENTREGA</h2>
                    </div>
                    <div className="flex gap-3 p-5 justify-center items-center">
                        <label htmlFor="city">
                            Ciudad
                        </label>
                        {/* pendiente a replanteamiento en ciudad */}
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.city}
                            id='city'
                        />
                        <label htmlFor="neighborhood">
                            Barrio
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.neighborhood}
                            id='neighborhood'
                        />
                        <label htmlFor="locality">
                            Localidad
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.locality}
                            id='locality'
                        />
                    </div>
                    <div>
                        <label htmlFor="address">
                            Direccion
                        </label>
                        <input
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder={customerDetails.address}
                            id='address'
                        />
                    </div>
                    <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2'>Editar cliente</button>
                </form>
            </div>
        </div>
    )
}

export default CustomersDetails