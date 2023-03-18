import axios from 'axios'
import { useState, createContext, useContext } from 'react'
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

    return (
        <UnitMeasuresContextProvider>
            <CategoriesContext.Provider value={{
                getAllCategories,
                dataCategories,
            }}>
                {props.children}
            </CategoriesContext.Provider>
        </UnitMeasuresContextProvider>
    )

}