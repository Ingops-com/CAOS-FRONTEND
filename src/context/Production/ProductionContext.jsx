import { createContext, useContext, useState } from "react";
import { UserContext } from "../User/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import RecipesIngrContextProvider from "./recipes/ingredients/RecipesIngrContext";
import StepsContextProvider from "./recipes/Steps/StepsContext";

export const ProductionContext = createContext();

export default function ProductionContextProvider(props) {

  const { token } = useContext(UserContext)
  const [data, setData] = useState([])

  function getAllRecipes() {
    axios({
      method: "GET",
      url: "/recipes",
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function createRecipes(name, description) {
    axios({
      method: "POST",
      url: "/recipes",
      headers: {
        'Authorization': token
      },
      data: {
        name,
        description
      }
    })
      .then((res) => {
        getAllRecipes()
        toast.success('RECETA CREADA')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function deleteRecipeById(id) {
    axios({
      method: "DELETE",
      url: `/recipes/${id}`,
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        getAllRecipes()
        toast.success('PRODUCTO BORRADO')
      })
      .catch((err) => {
        toast.error('ERROR AL BORRAR')
        console.log("error updateItemById" + err)
      })
  }

  return (
    <ProductionContext.Provider value={{
      getAllRecipes,
      createRecipes,
      deleteRecipeById,
      data
    }}>
      <RecipesIngrContextProvider>
        <StepsContextProvider>
          {props.children}
        </StepsContextProvider>
      </RecipesIngrContextProvider>
    </ProductionContext.Provider>
  )
}
