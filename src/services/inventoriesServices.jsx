import axios from "axios";

const logIn = async(name, password) => {

    axios.defaults.baseURL = "http://25.5.144.146:4000"

    return axios({
        method: "POST",
        url: "/api/inventories/",
        data: {
            name: name,
            password: password
        }
    })
}



export default logIn
