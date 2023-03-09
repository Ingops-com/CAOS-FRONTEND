import axios from "axios";


const Inventories = async (Token) => {

    axios.defaults.baseURL = "http://localhost:4000"
    return await axios({
        method: "GET",
        url: "/api/inventories-raw-material",
        headers:{
            'Authorization':Token
        }
    })
}


export default Inventories
