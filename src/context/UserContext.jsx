import { createContext } from "react";
import axios from "axios";


export const UserContext = createContext();

export function UserContextProvider(props) {

    const URL_API = import.meta.env.VITE_API_URL

    function login(name, password) {
        console.log(URL_API)
        axios.post('http://localhost:4000/api/auth/login', {
            name: name,
            password: password
        })
            .then((res) => {
                localStorage.setItem('key', JSON.stringify(res.data.tokenSession))
                localStorage.setItem('user', JSON.stringify(res.data.data))
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
