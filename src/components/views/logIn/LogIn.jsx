import React from "react";
import Button from "../../commons/buttons/Button";
import Caos from "../../../assets/img/CAOS.svg"
import Logo from "../../../assets/img/Logo.svg"
function LogIn(){ 
    return(
        <div className="w-full">
            <div className="bg-regal-blue/75 text-white m-auto rounded justify-center p-5 max-w-sm pt-12">
                <div className="imagenLogo p-2 flex justify-center items-center">
                    <img src={Logo} className="w-2/5 "/>
                </div>
                <div className="imagenLogo p-2">
                    <img src={Caos} className="w-full"/>
                </div>
                <div>
                    <label htmlFor="user" className="text-lg mb-5">Usuario</label>
                    <input type="text" id="user" className="bg-regal-blue w-11/12 p-3 rounded mb-3 border-black f" />
                    <label htmlFor="password" className="text-lg mb-5">Contraseña</label>
                    <input type="password" id="password" className="bg-regal-blue w-11/12 p-3 rounded mb-4 border-black f" />
                    {/* <Button 
                    text='Log in'
                    classButton='color'
                    functionClick=''/> */}
                    <button className="bg-emerald-400 text-regal-blue text-lg rounded p-3">Log in</button>
                </div>
            </div>
        </div>
    );
}
export default LogIn;