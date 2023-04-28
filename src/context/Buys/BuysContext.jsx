import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../User/UserContext";


export const BuysContext = createContext();

export function BuysContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataInvoices, setDataInvoices] = useState([]);
    const [datafilter, setDatafilter] = useState("");
    const [date, setDate] = useState([]);


    function getAllInvoices() {
        axios({
            method: "GET",
            url: "/invoices/",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setDataInvoices(res.data)
                setDatafilter(res.data)
                if (res.data != '') {
                    setDate(res.data.slice(-1)[0]);
                }
                else {
                    setDate({ 'createdAt': '00-00-0000' })
                }
            })
            .catch((err) => {
                console.log("Error getAll Invoices " + err)
            })
    }
    const createInvoice = async (amount, id_supplier, items) => {
        await axios({
            method: "POST",
            url: "/invoices/",
            headers: {
                'Authorization': token
            },
            data: {
                amount: amount,
                id_supplier: id_supplier,
                // items: items,
            }
        })
            .then((res) => {
                getAllInvoices()
            })
            .catch((err) => {
                console.log("Error create item invoice " + err)
            })
    }

    return (
        <BuysContext.Provider value={{
            getAllInvoices,
            date,
            datafilter,
            dataInvoices,
            setDataInvoices,
            createInvoice,
        }}>
            {props.children}
        </BuysContext.Provider>
    )
}
