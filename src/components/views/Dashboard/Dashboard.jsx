import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Dashboard() {
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