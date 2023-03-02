import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('key')
        if (token === null) {
            navigate("/")
        }
    }, [])


    return (
        <div className="flex h-full bg-[#f9f9fb] dark:bg-[#191B22]">
            <div id="sidebar" className="text-black w-1/6 p-5 dark:text-white">
                <Sidebar />
            </div>
            <div id="detail" className="w-full ">
                <Outlet />
            </div>
        </div>
    );
}