import { createContext } from "react";
import axios from "axios";


export const UserContext = createContext();

export function UserContextProvider(props) {

    function login(name, password) {

        axios.post('/auth/login', {
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
