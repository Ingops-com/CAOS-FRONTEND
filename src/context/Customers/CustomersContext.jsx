import axios from "axios";
import { useState, createContext, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../User/UserContext'


export const CustomersContext = createContext()

export default function CustomersContextProvider(props) {
    const { token } = useContext(UserContext)
    const [allCustomers, setAllcustomers] = useState([])
    const [customerDetails, setCustomerDetails] = useState([])



    async function getAllCustomers() {
        await axios({
            method: "GET",
            url: "/clients",
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setAllcustomers(res.data)
            })
            .catch((err) => {
                toast.error("error al recuperar clientes" + err)
            })
    }

    async function getCustomerById(id) {
        await axios({
            method:"GET",
            url: `/clients/${id}`,
            headers:{
                Authorization: token
            }
        })
        .then((res) => {
            setCustomerDetails(res.data)
        })
        .catch((err) => {
            toast.err("error al recuperar cliente" + err)
        })
    }

    async function deleteCustomer(id){
        await axios({
            method:"DELETE",
            url:`/clients/${id}`,
            headers:{
                Authorization: token
            }
        })
        .then((res) =>{
            toast.success("cliente eliminado correctamente")
        })
    }

    return (
        <CustomersContext.Provider value={{
            getAllCustomers,
            allCustomers,
            getCustomerById,
            customerDetails,
            deleteCustomer,
        }}>
            {props.children}
        </CustomersContext.Provider>
    )
}