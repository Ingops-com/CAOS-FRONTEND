import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider(props) {

    const [token, setToken] = useState(null)

    function login(name, password) {

        axios.post('/auth/login', {
            name: name,
            password: password
        })
            .then((res) => {
                localStorage.setItem('sessionToken', JSON.stringify(res.data.tokenSession))
                localStorage.setItem('userData', JSON.stringify(res.data.data))
                window.location.assign('/home')
            })
            .catch((err) => {
                console.error({ error: err })
            })

    }

    function getToken() {
        let token = localStorage.getItem('sessionToken')
        token = token.replace(/['"]+/g, '')
        setToken(token)
        return token
    }

    return (
        <UserContext.Provider value={{ login, getToken, token }}>
            {props.children}
        </UserContext.Provider >
    )
}
