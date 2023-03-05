import axios from "axios";


const Inventories = async (Token) => {

    axios.defaults.baseURL = "http://25.5.144.146:4000"
    return await axios({
        method: "GET",
        url: "/api/inventories-raw-material",
        headers:{
            'Authorization':Token
        }
    })
}


export default Inventories
