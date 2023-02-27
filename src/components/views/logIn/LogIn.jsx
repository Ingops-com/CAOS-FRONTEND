import React from "react";
import { useState } from "react";
import Services from "../../../services/loginServices"
import Caos from "../../../assets/svg/CAOS.svg"
import Logo from "../../../assets/svg/Logo.svg"
function LogIn() {

    const [user, setUser] = useState(" ");
    const [password, setPasword] = useState(" ");

    return (
        // contenedor principal del login
        <div className="bg-[#2A353B]/75 text-white m-auto rounded-3xl justify-center p-5 max-w-sm backdrop-blur-sm">
            <div className="imagenLogo p-2 flex justify-center items-center">
                <img src={Logo} className="w-2/5" />
            </div>
            <div className="imagenLogo p-2">
                <img src={Caos} className="w-full" />
            </div>
            {/* Contenedor de los campos del log in */}
            <div className="mt-10">
                <form
                    onSubmit={ev => {
                        ev.preventDefault();
                        setUser(ev.target.user.value)
                        setPasword(ev.target.password.value)
                        Services(user, password)
                    }} className="text-lg">
                    <label htmlFor="user" className="mb-5 ">USUARIO</label>
                    <input type="text" id="user" className="bg-regal-blue  text-center w-11/12 p-3 rounded mb-3 border-black f" />
                    <label htmlFor="password" className="mb-5">CONTRASE&Ntilde;A</label>
                    <input type="password" id="password" className="bg-regal-blue text-center w-11/12 p-3 rounded mb-4 border-black f" />
                    <button type="submit" className="bg-emerald-400 text-regal-blue rounded p-3">Ingresar</button>
                </form>
            </div>
        </div>

    );
}
export default LogIn;