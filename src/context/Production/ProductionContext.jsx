import { createContext, useContext, useState,useEffect } from "react";
import { UserContext } from "../User/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import RecipesIngrContextProvider from "./recipes/ingredients/RecipesIngrContext";
import StepsContextProvider from "./recipes/Steps/StepsContext";
import { InventoriesContext } from "../Inventories/InventoriesContext";
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export const ProductionContext = createContext();

export default function ProductionContextProvider(props) {

  const {data} = useContext(InventoriesContext)

  const { token } = useContext(UserContext)
  const [dataRecipes, setData] = useState([])

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

  function updateRecipes(id,name,description) {
    axios({
      method: "PUT",
      url: `/recipes/${id}`,
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
        toast.success('RECETA ACTUALIZADA')
      })
      .catch((err) => {
        console.log(err)
        toast.error('ERROR AL ACTUALIZAR')
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
        toast.success('RECETA BORRADA')
      })
      .catch((err) => {
        toast.error('ERROR AL BORRAR RECETA')
        console.log("error updateItemById" + err)
      })
  }

  function deleteStepsByRecipe(id) {
    axios({
      method: "DELETE",
      url: `/recipes-steps/recipe/${id}`,
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {

      })
      .catch((err) => {
        toast.error('ERROR AL BORRAR PASOS')
        console.log("error updateItemById" + err)
      })
  }

  function deleteIngrByRecipe(id) {
    axios({
      method: "DELETE",
      url: `/recipes-ingredients/recipe/${id}`,
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {

      })
      .catch((err) => {
        toast.error('ERROR AL BORRAR INGREDIENTES')
        console.log("error updateItemById" + err)
      })
  }

  function verifyIngr(items) {
    console.log(items)
    console.log(data)
  }

     const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado a servidor de sockets');
        });
        
        socket.on('updateProgress', (data) => {
            setProgress(data.progress);
            setCurrentStep(data.step);
        });

        return () => {
            socket.off('connect');
        };
    }, []);

 
  return (
    <ProductionContext.Provider value={{
      getAllRecipes,
      createRecipes,
      deleteRecipeById,
      deleteStepsByRecipe,
      deleteIngrByRecipe,
      updateRecipes,
      verifyIngr,
      dataRecipes,
      socket,
      progress,
      currentStep
    }}>
      <RecipesIngrContextProvider>
        <StepsContextProvider>
          {props.children}
        </StepsContextProvider>
      </RecipesIngrContextProvider>
    </ProductionContext.Provider>
  )
}
