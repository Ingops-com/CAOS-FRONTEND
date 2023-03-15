import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const RawMateContext = createContext()
export default function RawMateContextProvider(props) {

    const { token } = useContext(UserContext)
    const [dataRawMate, setDataRawMate] = useState([])
    

    function getAllRawMate
}