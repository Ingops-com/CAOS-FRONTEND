import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Dashboard() {

    const navigate = useNavigate();
    
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token === null) {
            navigate("/")
        }
    }, [])


    return (
        <>
            <div id="sidebar">
                <Navbar />
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}