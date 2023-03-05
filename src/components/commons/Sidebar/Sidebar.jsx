import { NavLink } from "react-router-dom";
import { RiDashboardFill, RiCalendarCheckFill, RiArchiveFill } from "react-icons/ri";
import caos from "../../../assets/svg/caos.light.svg"
import './Sidebar.css'

export default function Sidebar() {

    const navigate = [
        { name: 'Dashboard', href: '/home/soon/1', icon: <RiDashboardFill /> },
        { name: 'Inventarios', href: '/home/inventories', icon: <RiCalendarCheckFill /> },
        { name: 'Producto', href: '/home/soon/3', icon: <RiArchiveFill /> },
    ]

    return (
        <>
            <div className=" flex w-full p-5 justify-center items-center">
                <img src={caos} alt="logo.png" />
            </div>
            <nav className="grid gap-2">
                {
                    navigate.map((item) => (
                        <NavLink to={item.href} className={({ isActive }) => {
                            return ('flex w-full text-center rounded-lg p-1  transition-all dark:hover:bg-[#212528]' + (isActive ? 'invert shadow-lg border-0 border-b-4 border-b-[#FD0D0D] bg-white dark:bg-[#2B2E39]' : ''))
                        }}>
                            <div className="flex items-center p-2">
                                {item.icon}
                            </div>
                            <div className="flex w-full items-center p-2">
                                {item.name}
                            </div>
                        </NavLink>
                    ))
                }
            </nav>
        </>
    )
}

// bg-purple-500 w-full p-3 text-center rounded-lg shadow-lg3
