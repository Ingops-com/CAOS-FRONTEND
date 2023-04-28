import { NavLink } from "react-router-dom";
import { RiDashboardFill, RiCalendarCheckFill, RiArchiveFill, RiMoneyPoundBoxFill } from "react-icons/ri";
import caos from "../../../assets/svg/caos.light.svg"
import './Sidebar.css'

export default function Sidebar() {

    const navigate = [
        { name: 'Dashboard', href: '/home/soon/1', icon: <RiDashboardFill /> },
        { name: 'Inventarios', href: '/home/inventories', icon: <RiCalendarCheckFill /> },
        { name: 'Produccion', href: '/home/production', icon: <RiArchiveFill /> },
        { name: 'Finanzas' , href: '/home/buys', icon: <RiMoneyPoundBoxFill />}
    ]

    return (
        <>
            <div className=" flex w-full p-5 justify-center items-center">
                <img src={caos} alt="logo.png" />
            </div>
            <nav className="grid gap-2 ">
                {
                    navigate.map((item, index) => (
                        <NavLink to={item.href} key={index} className={({ isActive }) => {
                            return ('flex w-full text-center p-3 bg-gradient-to-r transition-all hover:from-gray-200 dark:hover:from-blue-ing-900 '
                                + (isActive ? 'bg-gray-200 dark:bg-blue-ing-900' : ''))
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
