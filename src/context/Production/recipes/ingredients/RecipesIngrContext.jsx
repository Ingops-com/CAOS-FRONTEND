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

    function getAllIngrbyId(id) {
        return axios({
            method: "GET",
            url: `/recipes-ingredients/${id}`,
            headers: {
                'Authorization': token
            }
        })
    }

    function createIngr(id_recipe, name_raw_material, percent) {
        axios({
            method: "POST",
            url: "/recipes-ingredients",
            headers: {
                'Authorization': token
            },
            data: {
                id_recipe,
                name_raw_material,
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

    const updateIngr = async(id_recipe, percent) => {
        await axios({
            method: 'PATCH',
            url: `/recipes-ingredients/${id_recipe}`,
            headers: {
                'Authorization': token
            },
            data: {
                percent
            }
        })
            .then((res) => {
                getAllRecipes()
                setRecipes(!recipes)
                toast.success('INGREDIENTE EDITADO')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteIngr = async(id) => {
        await axios({
            method: 'DELETE',
            url: `/recipes-ingredients/${id}`,
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                getAllRecipes()
                setRecipes(!recipes)
                toast.success('INGREDIENTE ELIMINADO')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <RecipesIngrContext.Provider value={{
            getAllIngrbyId,
            createIngr,
            updateIngr,
            deleteIngr,
            recipes
        }}>

            {props.children}
        </RecipesIngrContext.Provider>
    )
}
