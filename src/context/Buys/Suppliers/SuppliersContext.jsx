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

    function getAllSuppleirs() {
        axios({
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

    function createSupplier(name, email, phone){
        axios({
            method: "POST",
            url: "/Suppliers/",
            headers: {
                'Authorization': token
            },
            data:{
                name: name,
                contact_email: email,
                contact_phone: phone
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

    return(
        <SupplierContext.Provider value={{
            createSupplier,
            dataSuppliers,
            getAllSuppleirs,
            showFormSupplier,
            setShowFormSupplier,
            setshowFormNew,
            showFormNew,
        }}>
            {props.children}
        </SupplierContext.Provider>
    )
}