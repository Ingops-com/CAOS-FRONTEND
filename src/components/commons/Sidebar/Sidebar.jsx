import { RiDashboardFill, RiCalendarCheckFill, RiArchiveFill, RiMoneyPoundBoxFill } from "react-icons/ri";
import caos from "../../../assets/svg/caos.light.svg"
import './Sidebar.css'
import Items from "./Iitems/items";

export default function Sidebar() {

    const navigate = [
        {
            name: 'Dashboard',
            href: '/home/soon/1',
            submenu: true,
            submenuItems: [
                { name: 'Submenu 1', href: '/home/inventories' },
                { name: 'Submenu 2', href: '/home/production' }
            ],
            icon: <RiDashboardFill />
        },
        { name: 'Inventarios', href: '/home/inventories', icon: <RiCalendarCheckFill /> },
        { name: 'Produccion', href: '/home/production', icon: <RiArchiveFill /> },
        { name: 'Finanzas', href: '/home/buys', icon: <RiMoneyPoundBoxFill /> },
    ]

    // En el video minuto 25 https://www.youtube.com/watch?v=MszSqhEw__8&ab_channel=PradipDebnath

    return (
        <>
            <div className=" flex w-full p-5 justify-center items-center">
                <img src={caos} alt="logo.png" />
            </div>
            <aside className="grid gap-1">

                {
                    navigate.map((item, index) => (
                        <Items item={item} key={index} />
                    ))
                }
            </aside>

        </>
    )
}

// bg-purple-500 w-full p-3 text-center rounded-lg shadow-lg3
