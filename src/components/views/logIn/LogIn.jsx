import React from "react";
import { useState } from "react";
import Services from "../../../services/loginServices"
import Caos from "../../../assets/svg/caos.svg"
import Logo from "../../../assets/svg/logo.svg"
import './Login.css';

function LogIn() {

    const [user, setUser] = useState(" ");
    const [password, setPasword] = useState(" ");

    function handleSubmit(e) {
        e.preventDefault();
        setUser(ev.target.user.value)
        setPasword(ev.target.password.value)
        Services(user, password)
    }

    function handleInvalid(e) {
        e.target.setCustomValidity('Este campo es obligatorio')
    }

    return (
        // contenedor principal del login
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
                        <input type="text" id="user" className="bg-regal-blue text-center w-full p-3 rounded" onInvalid={handleInvalid} placeholder='USUARIO' required />
                    </p>
                    <p>
                        <input type="password" id="password" className="bg-regal-blue text-center w-full p-3 rounded  border-black" onInvalid={handleInvalid} placeholder='CONSTRASE&Ntilde;A' required />
                    </p>
                    <p>
                        <button type="submit" className="bg-emerald-400 text-regal-blue rounded p-3">Ingresar</button>
                    </p>
                </form>
            </div>
        </div>

    );
}
export default LogIn;