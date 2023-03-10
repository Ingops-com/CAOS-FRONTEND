import { useState, createContext, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();

export function UserContextProvider(props) {

    function login(name, password) {
        axios.post('http://25.5.144.146:4000/api/auth/login', {
            name: name,
            password: password
        })
            .then((res) => {
                localStorage.setItem('key',JSON.stringify(res.data.tokenSession))
                localStorage.setItem('user',JSON.stringify(res.data.data))
                window.location.assign('/home')
            })
            .catch((err) => {
                console.error({ error: err })
            })
    }

    return (
        <UserContext.Provider value={{ login }}>
            {props.children}
        </UserContext.Provider>
    )

}
