import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../User/UserContext";

export const SupplierContext = createContext()

export default function SupplierContextProvider(props) {

    const { token } = useContext(UserContext);
    const [dataSuppliers, setDataSuppliers] = useState([])
    const [showFormNew, setshowFormNew] = useState(false);
    const [showFormSupplier, setShowFormSupplier] = useState(false);
    const [dataEdit, setDataEdit] = useState([])

    async function getAllSuppleirs() {
        await axios({
            method: "GET",
            url: "/Suppliers/",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setDataSuppliers(res.data)
            })
            .catch((res) => {
                console.log("Error getAll Suppliers" + err)
            })
    }

    async function createSupplier(name, email, phone, active) {
        await axios({
            method: "POST",
            url: "/Suppliers/",
            headers: {
                'Authorization': token
            },
            data: {
                name: name,
                contact_email: email,
                contact_phone: phone,
                active: active
            }
        })
            .then((res) => {
                toast.success('PROVEEDOR CREADO')
                getAllSuppleirs()
            })
            .catch((err) => {
                console.log("Error create Suppliers " + err)
            })

    }

    async function deleteSupplier(id) {
        await axios({
            method: "DELETE",
            url: `/Suppliers/${id}`,
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                toast.success("Proveedor eliminado correctamente")
                getAllSuppleirs()
            })
            .catch((err) => {
                toast.err("fallo al eliminar el proveedor" + err)
            })
    }

    async function updateStateSupplier(id, status) {
        await axios({
            method: "PATCH",
            url: `/suppliers/${id}`,
            headers: {
                Authorization: token
            }, data: {
                active: !status
            }
        })
            .then((res) => {
                toast.success("proveedor actualizado correctamente")
                getAllSuppleirs()
            })
            .catch((err) => {
                toast.err("error al cambiar estatus" + err)
            })
    }

    async function updateDataSupplier(id, name, contact_email, contact_phone){
        await axios({
            method: "PATCH",
            url: `/suppliers/${id}`,
            headers: {
                Authorization: token
            }, data: {
                name: name,
                contact_email: contact_email,
                contact_phone: contact_phone
            }
        })
            .then((res) => {
                toast.success("proveedor actualizado correctamente")
                getAllSuppleirs()
            })
            .catch((err) => {
                toast.err("error al cambiar estatus" + err)
            })
    }
    return (
        <SupplierContext.Provider value={{
            createSupplier,
            dataSuppliers,
            getAllSuppleirs,
            showFormSupplier,
            setShowFormSupplier,
            setshowFormNew,
            showFormNew,
            updateStateSupplier,
            deleteSupplier,
            dataEdit,
            setDataEdit,
            updateDataSupplier
        }}>
            {props.children}
        </SupplierContext.Provider>
    )
}