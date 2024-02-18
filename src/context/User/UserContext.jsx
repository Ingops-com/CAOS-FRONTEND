import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
                if(err.response.status == 401){
                    toast.error('USUARIO 0 CONTRASEÑA INVALIDA')
                }
            })

    }

    function getToken() {
        let token = localStorage.getItem('sessionToken')
        token = token.replace(/['"]+/g, '')
        setToken(token)
        return token
    }

    function validatePermission(user, maxValid) {
        return user > maxValid ? false : true
    }


    return (
        <UserContext.Provider value={{ login, getToken, token , validatePermission}}>
            {props.children}
        </UserContext.Provider >
    )
}
