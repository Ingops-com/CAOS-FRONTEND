import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../../../services/loginServices"
import Caos from "../../../assets/svg/caos.svg"
import Logo from "../../../assets/svg/logo.svg"
import './Login.css';
import { UserContext, UserContextProvider } from "../../../context/UserContext";


function LogIn() {

    // const navigate = useNavigate();

    // useEffect(() => {
    //     localStorage.clear()
    // }, [])


    // function handleSubmit(e) {
    //     e.preventDefault()
    //     localStorage.clear()
    //     getData()
    // }

    // function getData() {
    //     const user = document.getElementById('user').value
    //     const password = document.getElementById('password').value

    //     Services(user, password).then(res => {

    //         console.log(res.data)

    //         let token = JSON.stringify(res.data.tokenSession)

    //         localStorage.setItem("token", token);

    //         if(token){
    //             navigate("/home")
    //         }
    //     })
    // }


    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        setName(e.target.user.value)
        setPassword(e.target.password.value)
        console.log(data)
    }
    let data = useContext(UserContext)

    return (
        <UserContextProvider name={name} password={password}>
            <div className="flex h-screen w-full items-center justify-center background">
                <div className="grid gap-2 bg-[#2A353B]/75 text-white rounded-3xl justify-center p-5 max-w-sm backdrop-blur-sm">
                    <div>
                        <div className="imagenLogo p-2 flex justify-center items-center">
                            <img src={Logo} className="w-2/5" />
                        </div>
                        <div className="imagenLogo p-2 flex justify-center items-center">
                            <img src={Caos} className="w-full" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="grid text-lg gap-5">
                        <p>
                            <input type="text" id="user" className="bg-regal-blue text-center w-full p-3 rounded" placeholder='USUARIO' required />
                        </p>
                        <p>
                            <input type="password" id="password" className="bg-regal-blue text-center w-full p-3 rounded  border-black" placeholder='CONSTRASE&Ntilde;A' required />
                        </p>
                        <p className="flex justify-center">
                            <button type="submit" className="flex bg-emerald-400 text-regal-blue rounded p-3" >Ingresar</button>
                        </p>
                    </form>
                </div>
            </div>
        </UserContextProvider>
    );
}






export default LogIn;