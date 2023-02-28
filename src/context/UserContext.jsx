import { useState, createContext } from "react";
import Axios from "axios";


export const UserContext = createContext();

export function UserContextProvider(props) {

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null);

    let data = { user, token }

    async function login(props) {
        try {
            const data = await Axios.post('http://25.5.144.146:4000/api/auth/login', {
                name: props.name,
                password: props.password 
            });
            setUser(data.user)
            setToken(data.setToken)
        } catch (error) {
            console.log(error)
        }
    }
    login(props)
    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )

}

// export function UserProvider() {
//     return <UserContext.Provider value={value} />
// }

// export function useUser(){
//     const context = React.useContext(UserContext)
//     if(!context) {
//         throw new error('useUser debe estar dentro del proveedor UserContext')
//     }
//     return context;
// } 