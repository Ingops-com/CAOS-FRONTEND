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
   
    return (
        <BuysContext.Provider value={{
            getAllInvoices,
            date,
            datafilter,
            dataInvoices,
            setDataInvoices,
        }}>
            {props.children}
        </BuysContext.Provider>
    )
}
