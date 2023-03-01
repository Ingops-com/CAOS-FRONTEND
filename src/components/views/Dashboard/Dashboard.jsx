import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import Navbar from "../Navbar/Navbar";

export default function Dashboard() {

    const { user } = useContext(UserContext)

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('key')
        if (token === null) {
            navigate("/")
        }
    }, [])


    return (
        <div className="flex h-">
            <div id="sidebar" className="bg-black text-cyan-50 w-1/6">
                <Navbar />
            </div>
            <div id="detail" className="bg-red-500 w-full">
                <h1>sa</h1>
                <Outlet />
            </div>
        </div>
    );
}