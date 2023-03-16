import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const RawMateContext = createContext()
export default function RawMateContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataRawMate, setDataRawMate] = useState([])


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

    return (
        <RawMateContext.Provider value={{
            getAllRawMate,
            dataRawMate
        }}>
            {props.children}
        </RawMateContext.Provider>
    )
} 