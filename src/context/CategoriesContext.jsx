import axios from 'axios'
import { useState, createContext, useContext } from 'react'
import { UserContext } from './UserContext'

export const CategoriesContext = createContext()

export default function CategoriesContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataCategories, setCategories] = useState([])
    const [dataUnitMeasure, setDataUnitMeasure] = useState([])
    const [dataIdRawMaterial, setdataIdRawMaterial] = useState([])


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

    const getAllUnitMeasure = async () => {
        await axios({
            method: "GET",
            url: "/unit-measures",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setDataUnitMeasure(res.data)
            })
            .catch((err) => {
                console.log("Error getAll Unit Measure " + err)
            })
    }

    const createRawMaterial = async (name, categorie, unit_measure) => {
        await axios({
            method: "POST",
            url: "/raw-material/",
            headers: {
                'Authorization': token
            },
            data: {
                name: name,
                category_id: categorie,
                unit_measure_id: unit_measure
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log("Error getAll Unit Measure " + err)
            })
    }

    const getIdRawMaterial = async (name) => {
        await axios({
            method: "GET",
            url: `/raw-material/byname/${name}`,
            headers: {
                'Authorization': token
            },
        })
            .then((res) => {
                setdataIdRawMaterial(res.data)
            })
            .catch((err) => {
                console.log("Error getAll Unit Measure " + err)
            })
    }
    const createItemInventorie = async (rawId) => {
        await axios({
            method: "POST",
            url: "/inventories-raw-material/",
            headers: {
                'Authorization': token
            },
            data: {
                raw_material_id: rawId,
                stock: 0,
                price: 0
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log("Error getAll Unit Measure " + err)
            })
    }
    return (
        <CategoriesContext.Provider value={{
            getAllCategories,
            dataCategories,
            dataUnitMeasure,
            getAllUnitMeasure,
            createRawMaterial,
            getIdRawMaterial,
            dataIdRawMaterial,
            createItemInventorie
        }}>
            {props.children}
        </CategoriesContext.Provider>
    )

}