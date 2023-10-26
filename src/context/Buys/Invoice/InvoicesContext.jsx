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
    const [showFormEdit, setShowFormEdit] = useState(false)
    const [itemsEditData, setItemsEditData] = useState([]);
    const [dataInvoice, SetDataInvoice] = useState([])
    const [dataInvoices, setDataInvoices] = useState([]);
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

    async function getAllItemsById(id) {
        await axios({
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

    async function getDataInvoiceByid(id) {
        await axios({
            method: "GET",
            url: `/invoices/${id}`,
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                SetDataInvoice(res.data)

            })
            .catch((err) => {
                console.log("Error getAll Invoices " + err)
            })
    }

    function createInvoice(totalValue, id_supplier) {
        axios({
            method: "POST",
            url: "/invoices",
            headers: {
                'Authorization': token
            },
            data: {
                "amount": totalValue,
                "id_supplier": id_supplier
            }
        })
            .then((res) => {
                setIdInvoice(res.data.id)
                toast.success('Factura creada')
            })
            .catch((err) => {
                toast.error('Error al crear factura')
            })
    }

    function createItemsJson(dataForm) {
        axios({
            method: "POST",
            url: "/invoices/items/json/",
            headers: {
                Authorization: token
            }, data: {
                "items": dataForm
            }
        })
            .then((res) => {
            })
            .catch((err) => {
                toast.error('Fallo al crear items' + err)
            })
    }

    function JSONConvertItems(JSONDataForm) {
        // Construye el objeto en el formato deseado,
        const jsonDeseado = JSONDataForm.map(item => {
            let id_invoice = idInvoice
            const { quantity, amount, product } = item;
            const { name, id, unit_measure_id } = product;
            return {
                id_invoice: id_invoice,
                name: name,
                quantity: quantity,
                measure: "kg",
                amount: amount,
            };
        });

        createItemsJson(jsonDeseado);
    };

    async function editItemById() {
        await axios({
            method: "PUT",
            url: `/Invoices/items/${itemsEditData.id}`,
            headers: {
                Authorization: token
            }, data: {
                name: itemsEditData.name,
                amount: itemsEditData.amount,
                quantity: itemsEditData.quantity,
            }
        })
            .then((res) => {
                getAllItemsById(itemsEditData.id_invoice)
                getDataInvoiceByid(itemsEditData.id_invoice)
            })
            .catch((err) => {
                toast.error('Fallo al crear items' + err)
            })
    }

    async function editInvoiceById() {
        const total = dataItemInvoice.reduce((acc, item) => {
            const amountTimesQuantity = item.amount * item.quantity;
            return acc + amountTimesQuantity;
        }, 0);

        await axios({
            method: "PUT",
            url: `/Invoices/${itemsEditData.id_invoice}`,
            headers: {
                Authorization: token
            }, data: {
                amount: total,
                id_supplier: dataInvoice[0].id_supplier
            }
        })
            .then((res) => {
                toast.success("Factura editada correctamente")

            })
            .catch((err) => {
            })
            ;

    }

    const deleteItemsInvoices = async (invoiceItem) => {
        await axios({
            method: "DELETE",
            url: `/invoices/items/${invoiceItem.id}`,
            headers: {
                Authorization: token
            }

        })
            .then((res) => {
                toast.success("item eliminado correctamente")
                getAllItemsById(itemsEditData.id_invoice)
                editInvoiceByItem()
            })
            .catch((err) => {
                toast.error("Fallo al eliminar item" + err)
            })
    }

    return (
        <InvoicesContext.Provider value={{
            getAllItemsById,
            dataItemInvoice,
            createInvoice,
            JSONConvertItems,
            showFormEdit,
            setShowFormEdit,
            itemsEditData,
            setItemsEditData,
            idInvoice,
            editItemById,
            getDataInvoiceByid,
            dataInvoice,
            deleteItemsInvoices,
            getAllInvoices,
            date,
            dataInvoices,
            editInvoiceById,
        }}>{props.children}
        </InvoicesContext.Provider>
    )
}