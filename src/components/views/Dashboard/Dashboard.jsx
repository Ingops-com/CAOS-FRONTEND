import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../commons/Navbar/Navbar";
import Sidebar from "../../commons/Sidebar/Sidebar";

export default function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('key')
        if (token === null) {
            navigate("/")
        }
    }, [])


    return (
        <div className="flex w-full h-screen bg-[#f9f9fb] dark:bg-dark-ing-900"> {/* Color orginal dark:bg-[#212528]*/}
            <div id="sidebar" className="text-black w-1/6 p-5 dark:text-white dark:bg-dark-ing-800"> {/* Color original dark:bg-[#2a2f32]  */}
                <Sidebar />
            </div>
            <div id="detail" className=" w-full p-5">
                <Navbar />
                <div className="">

                    <Outlet />
                </div>
            </div>
        </div>
    );
}