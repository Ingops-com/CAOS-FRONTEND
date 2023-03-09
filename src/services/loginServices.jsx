import axios from "axios";

const logIn = async(name, password) => {

    axios.defaults.baseURL = "http://localhost:4000"

    return axios({
        method: "POST",
        url: "/api/auth/login",
        data: {
            name: name,
            password: password
        }
    })
}



export default logIn

