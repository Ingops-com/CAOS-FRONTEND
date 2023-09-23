import axios from 'axios'
import { useState, createContext, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../User/UserContext'

export const RawMateContext = createContext()
export default function RawMateContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataRawMate] = useState([])
    const [dataIdRawMaterial, setdataIdRawMaterial] = useState(null)
    const [newRawMate, setNewRawMate] = useState('')
    const [dataAllRawMate, setDataAllRawMate] = useState([])

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
                console.log("Error get Id by name " + err)
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
                setNewRawMate(name)
                console.log(res)
            })
            .catch((err) => {
                console.log("Error getAll create raw material " + err)
            })
    }

    function getAllRawMaterial() {
        axios({
            method: "GET",
            url: "/raw-material",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                setDataAllRawMate(res.data)
            })
            .catch((err) => {
                console.log("A ocurrido un error" + err)
            })

    }



    return (
        <RawMateContext.Provider value={{
            dataIdRawMaterial,
            newRawMate,
            dataRawMate,
            setNewRawMate,
            createRawMaterial,
            getIdRawMaterial,
            getAllRawMaterial,
            dataAllRawMate
        }}>
            {props.children}
        </RawMateContext.Provider>
    )
} 