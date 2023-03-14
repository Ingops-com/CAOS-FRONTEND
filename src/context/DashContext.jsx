import { createContext } from "react";

export const DashContext = createContext();

export function DashContextProvider(props) {

    function verifySession(){
        let token = localStorage.getItem('sessionToken')
        console.log(token)
        if (token === null) {
            window.location.assign('/')
        }
    }

    return (
        <DashContext.Provider value={{ verifySession }}>
            {props.children}
        </DashContext.Provider>
    )
}
