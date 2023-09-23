import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../User/UserContext";
import { BuysContext } from "../BuysContext";

export const InvoicesContext = createContext();

export function InvoicesContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataItemInvoice, setDataItemInvoice] = useState([]);
    const [createController, setCreateController] = useState([]);

    function getAllItemsById(id) {
        axios({
            method: "GET",
            url: `/invoices/items/${id}`,
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setDataItemInvoice(res.data)
            })
            .catch((err) => {
                console.log("Error getAll Invoices " + err)
            })
    }

    function createInvoice( amount, id_supplier) {
        axios({
            method: "POST",
            url: "/invoices",
            headers: {
                'Authorization': token
            },
            data: {
                "amount":amount,
                "id_supplier": id_supplier
            }
        })
            .then((res) => {
                toast.success('Factura creada')
                setCreateController(true)
            })
            .catch((err) => {
                toast.error('Error al crear factura')
            })
    }

    return (
        <InvoicesContext.Provider value={{
            getAllItemsById,
            dataItemInvoice,
            createInvoice,
            createController
        }}>{props.children}
        </InvoicesContext.Provider>
    )
}