import { createContext, useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'

export const UnitMeasuresContext = createContext()

export function UnitMeasuresContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataUnitMeasure, setDataUnitMeasure] = useState([])

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

    return (
        <UnitMeasuresContext.Provider value={{ getAllUnitMeasure, dataUnitMeasure }}>
            {props.children}
        </UnitMeasuresContext.Provider>
    )
}

