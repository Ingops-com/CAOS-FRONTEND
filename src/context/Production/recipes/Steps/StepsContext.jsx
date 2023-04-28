import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../../User/UserContext";
import { ProductionContext } from "../../ProductionContext";

export const StepsContext = createContext();

export default function StepsContextProvider(props) {

    const { token } = useContext(UserContext)
    const { getAllRecipes } = useContext(ProductionContext)
    const [steps, setSteps] = useState(false)

    function getAllStepsbyId(id) {
        return axios({
            method: "GET",
            url: `/recipes-steps/${id}`,
            headers: {
                'Authorization': token
            }
        })
    }

    function createStep(id_recipe, description) {
        axios({
            method: "POST",
            url: "/recipes-steps",
            headers: {
                'Authorization': token
            },
            data: {
                id_recipe,
                description
            }
        })
            .then((res) => {
                setSteps(!steps)
                toast.success('PASO CREAD0')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <StepsContext.Provider value={{
            getAllStepsbyId,
            createStep,
            steps
        }}>

            {props.children}
        </StepsContext.Provider>
    )
}
