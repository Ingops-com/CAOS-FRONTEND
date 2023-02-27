import React from "react";
import { useState } from "react";
import Services from "../../../services/loginServices"
import Caos from "../../../assets/img/CAOS.svg"
import Logo from "../../../assets/img/Logo.svg"
function LogIn(){ 

    const [user, setUser] = useState(" ");
    const [password,setPasword] = useState(" ");

    return(
        // contenedor principal del login
            <div className="bg-regal-blue/75 text-white m-auto rounded justify-center p-5 max-w-sm pt-12">
                <div className="imagenLogo p-2 flex justify-center items-center">
                        <img src={Logo} className="w-2/5 "/>
                </div>
                <div className="imagenLogo p-2">
                        <img src={Caos} className="w-full"/>
                </div>
                    {/* Contenedor de los campos del log in */}
                <div>
                    <form
                        onSubmit={ev=>{
                            ev.preventDefault();
                            setUser(ev.target.user.value)
                            setPasword(ev.target.password.value)
                            Services(user,password)
                        }}>
                        <label htmlFor="user" className="text-lg mb-5">Usuario</label>
                        <input type="text" id="user" className="bg-regal-blue w-11/12 p-3 rounded mb-3 border-black f" />
                        <label htmlFor="password" className="text-lg mb-5">Contraseña</label>
                        <input type="password" id="password" className="bg-regal-blue w-11/12 p-3 rounded mb-4 border-black f" />      
                        <button type="submit" className="bg-emerald-400 text-regal-blue text-lg rounded p-3">Ingresar</button>
                    </form>
                </div>
            </div>

    );
}
export default LogIn;