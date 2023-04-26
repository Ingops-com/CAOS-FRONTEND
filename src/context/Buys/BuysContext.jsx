import { createContext, useContext } from "react";
import { UserContext } from "../User/UserContext";

export const BuysContext = createContext();

export function BuysContextProvider(props) {


    return (
        <BuysContext.Provider>
            {props.children}
        </BuysContext.Provider>
    )
}
