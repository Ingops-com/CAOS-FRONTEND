import { createContext, useContext } from "react";
import { UserContext } from "../User/UserContext";

export const DashContext = createContext();

export function DashContextProvider(props) {

    const {  getToken  } = useContext(UserContext)

    function verifySession() {
        let token = (getToken())
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
