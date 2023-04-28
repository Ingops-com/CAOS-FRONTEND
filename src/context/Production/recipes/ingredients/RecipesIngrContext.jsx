import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../../User/UserContext";
import { ProductionContext } from "../../ProductionContext";

export const RecipesIngrContext = createContext();

export default function RecipesIngrContextProvider(props) {

    const { token } = useContext(UserContext)
    const { getAllRecipes } = useContext(ProductionContext)
    const [recipes, setRecipes] = useState(false)


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

    function createIngr(id_recipe, id_raw_material, percent) {
        axios({
            method: "POST",
            url: "/recipes-ingredients",
            headers: {
                'Authorization': token
            },
            data: {
                id_recipe,
                id_raw_material,
                percent
            }
        })
            .then((res) => {
                getAllRecipes()
                setRecipes(!recipes)
                toast.success('INGREDIENTE CREAD0')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <RecipesIngrContext.Provider value={{
            // getAllIngr,
            getAllIngrbyId,
            createIngr,
            recipes
        }}>

            {props.children}
        </RecipesIngrContext.Provider>
    )
}
