import axios from "axios";
import { useState, createContext, useContext} from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../User/UserContext'

export const BankAccountsContext = createContext()

export default function BankAccountsContextProvider(props){

    const {token} = useContext(UserContext)
    const [dataBanks, setDataBanks] = useState([])
    const [editDataBank, setEditDataBank] = useState([])
    const [dataAccounts, setDataAccounts] = useState([])


    async function getAllBanks(){
        await axios({
            method: "GET",
            url: "/banks/",
            headers:{
                Authorization: token
            }
        })
        .then((res) => {
            setDataBanks(res.data)
        })
        .catch((err) => {
            toast.error("error al recuperar bancos" + err)
        })
    }

    async function createBank(name){
        await axios({
            method:"POST",
            url: "/banks",
            headers:{
                Authorization: token
            },
            data:{
                "name": name
            }
        })
        .then((res) => {
            toast.success("Banco creado correctamente")
            getAllBanks()
        })
        .catch((err)=> {
            toast.error("Error al crear banco" + err)
        })
    }

    async function EditBank(id,name){
        await axios({
            method:"PATCH",
            url: `/banks/${id}`,
            headers:{
                Authorization: token,
            },
            data:{
                name: name
            }
        })
        .then((res) => {
            toast.success("Banco editado correctamente")
            getAllBanks()
        })
        .catch((err) => {
            toast.error("Error al editar el banco" + err)
        })
    }
    async function deleteBank(id){
        await axios({
            method: "DELETE",
            url: `/banks/${id}`,
            headers:{
                Authorization: token
            }
        })
        .then((res) => {
            toast.success("Banco eliminado correctamente")
            getAllBanks()
        })
        .catch((err) => {
            toast.error("Erro al eliminar banco" + err)
        })
    }

    async function getAllBankAccounts(){
        await axios({
            method: "GET",
            url:"/banks/accounts/",
            headers:{
                Authorization: token
            }
        })
        .then((res)=>{
            setDataAccounts(res.data)
        })
        .catch((err) => {
            toast.error("error al recuperar las cuentas" + err)
        })
    }
    async function deleteBankAccounts(id){
        await axios({
            method:"DELETE",
            url:`/banks/accounts/${id}`,
            headers:{
                Authorization: token
            }
        })
        .then((res) => {
            toast.success("Cuenta eliminada correctamente")
            getAllBankAccounts()
        })
        .catch((err) => {
            toast.error("error al eliminar la cuenta" + err)
        })
    }

    async function createBankAccount(bank, number, type, owner, balance){
        await axios({
            method: "POST",
            url:"/banks/accounts/",
            headers:{
                Authorization:token
            },
            data:{
                id_bank: bank,
                number: number,
                type: type,
                owner: owner,
                balance: balance
            }
        })
        .then((res) => {
            toast.success("Cuenta creada correctamente")
            getAllBankAccounts()
        })
        .catch((err) => {
            toast.error("Errp al crear la cuenta" + err)
        })

    }
    return(
        <BankAccountsContext.Provider value={{
            dataBanks,
            getAllBanks,
            createBank,
            EditBank,
            deleteBank,
            editDataBank,
            setEditDataBank, 
            getAllBankAccounts,
            dataAccounts,
            deleteBankAccounts,
            createBankAccount

        }}>
            {props.children}
        </BankAccountsContext.Provider>
    )
}