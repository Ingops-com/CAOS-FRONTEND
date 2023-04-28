import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../../User/UserContext";

export const RecipesIngrContext = createContext();

export default function RecipesIngrContextProvider(props) {

    const { token } = useContext(UserContext)
    // const [data, setData] = useState([])

    // function getAllIngr() {
    //     axios({
    //         method: "GET",
    //         url: `/recipes-ingredients`,
    //         headers: {
    //             'Authorization': token
    //         }
    //     })
    //         .then((res) => {
    //             setData(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    function getAllIngrbyId(id) {
        return axios({
            method: "GET",
            url: `/recipes-ingredients/${id}`,
            headers: {
                'Authorization': token
            }
        })
    }

    return (
        <RecipesIngrContext.Provider value={{
            // getAllIngr,
            getAllIngrbyId,
            // data
        }}>

            {props.children}
        </RecipesIngrContext.Provider>
    )
}
