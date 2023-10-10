import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../User/UserContext";


export const BuysContext = createContext();

export function BuysContextProvider(props) {

   
    return (
        <BuysContext.Provider value={{
           }}>
            {props.children}
        </BuysContext.Provider>
    )
}
