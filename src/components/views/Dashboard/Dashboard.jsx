import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CategoriesContextProvider from "../../../context/Inventories/Categories/CategoriesContext";
import { DashContext } from "../../../context/Dashboard/DashContext";
import { NavbarContextProvider } from "../../../context/Dashboard/Navbar/NavbarContext";
import RawMateContextProvider from "../../../context/Inventories/Raw Material/RawMateContext";
import Navbar from "../../commons/Navbar/Navbar";
import SidebarMenu from "../../commons/Sidebar/Sidebar";

export default function Dashboard() {

    const { verifySession } = useContext(DashContext)

    useEffect(() => {
        verifySession()
    }, [])

    return (
        <NavbarContextProvider>
            <div className="flex w-full h-screen bg-main-white dark:bg-dark-ing-900">
                <div id="sidebar" >
                    <SidebarMenu />
                </div>
                <div id="detail" className=" w-full p-5">
                    <div className="dark:text-white">
                        <Navbar />
                    </div>
                    <div className="">
                        <CategoriesContextProvider>
                            <RawMateContextProvider>
                                <Outlet />
                            </RawMateContextProvider>
                        </CategoriesContextProvider>
                    </div>
                </div>
            </div>
        </NavbarContextProvider>
    );
}