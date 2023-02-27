import axios from "axios";
import { useNavigate } from "react-router-dom";

function logIn(name, password) {

    axios.defaults.baseURL = "http://localhost:4000"
    try {
        axios({
            method: "POST",
            url: "/api/auth/login",
            data: {
                name: name,
                password: password
            }
        }).then((res) => {
            // localStorage.clear()
            // localStorage.setItem("token", JSON.stringify(res.data.tokenSession));
            console.log(res)
        }).catch((err) => {
            console.log(err)
            return
        })
    } catch (error) {
        console.log(error)
        return
    }
}

export default logIn

