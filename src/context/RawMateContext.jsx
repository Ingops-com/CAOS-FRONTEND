import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const RawMateContext = createContext()
export default function RawMateContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataRawMate, setDataRawMate] = useState([])
    const [dataUnitMeasure, setDataUnitMeasure] = useState([])
    const [dataIdRawMaterial, setdataIdRawMaterial] = useState([])


    const getAllRawMate = async () => {
        await axios({
            method: "get",
            url: "/raw-material",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setDataRawMate(res.data)
            })
            .catch((err) => {
                console.log("Error getAll Raw Material " + err)
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
        <RawMateContext.Provider value={{
            getAllRawMate,
            dataRawMate,
            dataUnitMeasure,
            getAllUnitMeasure,
            createRawMaterial,
            getIdRawMaterial,
            dataIdRawMaterial,
            createItemInventorie
        }}>
            {props.children}
        </RawMateContext.Provider>
    )
} 