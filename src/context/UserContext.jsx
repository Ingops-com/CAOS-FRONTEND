import { useState, createContext, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();

export function UserContextProvider(props) {

    function login(name, password) {
        axios.post('http://localhost:4000/api/auth/login', {
            name: name,
            password: password
        })
            .then((res) => {
                localStorage.setItem('key',JSON.stringify(res.data.tokenSession))
                window.location.assign('/home')
            })
            .catch((err) => {
                console.error({ error: err.response.data })
            })
    }

    return (
        <UserContext.Provider value={{ login }}>
            {props.children}
        </UserContext.Provider>
    )

}
