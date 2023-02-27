import axios from "axios";

function logIn(name, password) {

    axios.defaults.baseURL = "http://25.5.144.146:4000"

    try {
        axios({
            method: "POST",
            url: "/api/auth/login",
            data: {
                name: name,
                password: password
            }
        }).then(function (response) {
            localStorage.setItem("key", JSON.stringify(response.data.tokenSession));
        })
    } catch (error) {
        console.log()
    }
}

export default logIn

