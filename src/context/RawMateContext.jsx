import axios from 'axios'
import { useState, createContext, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from './UserContext'

export const RawMateContext = createContext()
export default function RawMateContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataRawMate, setDataRawMate] = useState([])
    const [dataIdRawMaterial, setdataIdRawMaterial] = useState([])
    const [newRawMate, setNewRawMate] = useState('')

    const getIdRawMaterial = async (name) => {
        await axios({
            method: "GET",
            url: `/raw-material/byname/${name}`,
            headers: {
                'Authorization': token
            },
        })
            .then((res) => {
                setdataIdRawMaterial(JSON.stringify(res.data.id))
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
                toast.success('CREACION EXITOSA')
                setNewRawMate(name)
            })
            .catch((err) => {
                console.log("Error getAll Unit Measure " + err)
            })
    }

    return (
        <RawMateContext.Provider value={{
            dataIdRawMaterial,
            newRawMate,
            dataRawMate,
            // getAllRawMate,
            setNewRawMate,
            createRawMaterial,
            getIdRawMaterial,
        }}>
            {props.children}
        </RawMateContext.Provider>
    )
} 