import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const CategoriesContext = createContext()

export default function CategoriesContextProvider(props) {

    const { token } = useContext(UserContext)
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getAllCategories()
    }, [categories])


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
        <CategoriesContext.Provider value={{
            getAllCategories,
            categories
        }}>
            {props.children}
        </CategoriesContext.Provider>
    )

}