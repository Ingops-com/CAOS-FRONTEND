import axios from "axios";

export function login(name, password) {

    axios.post('/auth/login', {
        name: name,
        password: password
    })
        .then((res) => {
            localStorage.setItem('sessionToken', JSON.stringify(res.data.tokenSession))
            localStorage.setItem('user', JSON.stringify(res.data.data))
            window.location.assign('/home')
        })
        .catch((err) => {
            console.error({ error: err })
        })

}



