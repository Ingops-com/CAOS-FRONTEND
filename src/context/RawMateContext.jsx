import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const RawMateContext = createContext()
export default function RawMateContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataRawMate, setDataRawMate] = useState([])

    useEffect(()=>{
        getAllRawMate()
    },[dataRawMate])

    function getAllRawMate() {
        axios({
            method: "get",
            url: "/raw-material",
            headers: {
                'Authorization': token
            },
            data:{

            }
        })
            .then((res) => {
                setDataRawMate(res.data)
            })
            .catch((err) => {
                console.log("Error getAll Raw Material " + err)
            })
    }

return(
    <RawMaterialContext.Provider value={{
        getAllRawMate,
        dataRawMate
    }}>
        {props.children}
    </RawMaterialContext.Provider>
)
} 