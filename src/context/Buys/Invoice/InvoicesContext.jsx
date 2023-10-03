import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../User/UserContext";
import { BuysContext } from "../BuysContext";

export const InvoicesContext = createContext();

export function InvoicesContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataItemInvoice, setDataItemInvoice] = useState([]);
    const [idInvoice, setIdInvoice] = useState(0);

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

    function createInvoice( totalValue, id_supplier) {
        axios({
            method: "POST",
            url: "/invoices",
            headers: {
                'Authorization': token
            },
            data: {
                "amount":totalValue,
                "id_supplier": id_supplier
            }
        })
            .then((res) => {
                toast.success('Factura creada')
                setIdInvoice(res.data)
            })
            .catch((err) => {
                toast.error('Error al crear factura')
            })
    }

    function createItemsJson(dataForm){
        axios({
            method:"POST",
            url:"/invoices/items/json/",
            headers:{
                Authorization: token
            },data:{
                "items": {dataForm}
            }
        })
        .then((res)=>{
            toast.success('Items creados')
        })
        .catch((err)=>{
            toast.error('Fallo al crear items')
        })
    }

    function JSONConvertItems(JSONDataForm) {
        const { amount, product, quantity } = JSONDataForm;
        console.log(amount)
        const { name, unit_measure_id } = product;
      
        // Construye el objeto en el formato deseado
        const JSONData = {
          id_invoice: idInvoice,
          name: name,
          quantity: quantity,
          measure: "kg",
          //measure: unit_measure_id, // Supongamos que siempre es "kg" en este caso
          amount: amount
        };
      
        createItemsJson(JSONData);
      };



    return (
        <InvoicesContext.Provider value={{
            getAllItemsById,
            dataItemInvoice,
            createInvoice,
            JSONConvertItems
        }}>{props.children}
        </InvoicesContext.Provider>
    )
}