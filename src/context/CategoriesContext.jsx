import axios from 'axios'
import { useState, createContext, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { UnitMeasuresContextProvider } from './UnitMeasuresContext'
import { UserContext } from './UserContext'

export const CategoriesContext = createContext()

export default function CategoriesContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataCategories, setCategories] = useState([])

    function getAllCategories() {
        axios({
            method: "GET",
            url: "/categories/",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.log("Error getAll Categories " + err)
            })
    }

    function createCategorie(name) {
        axios({
            method: "POST",
            url: "/categories/",
            headers: {
                'Authorization': token
            },
            data:{
                name:name
            }
        })
            .then((res) => {
                toast.success('CATEGORIA CREADA')
                getAllCategories()
            })
            .catch((err) => {
                console.log("Error getAll Categories " + err)
            })
    }

    return (
        <UnitMeasuresContextProvider>
            <CategoriesContext.Provider value={{
                getAllCategories,
                dataCategories,
                createCategorie
            }}>
                {props.children}
            </CategoriesContext.Provider>
        </UnitMeasuresContextProvider>
    )

}