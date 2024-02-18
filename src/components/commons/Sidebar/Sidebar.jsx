import { RiDashboardFill, RiCalendarCheckFill, RiArchiveFill, RiMoneyPoundBoxFill, RiUser3Fill } from "react-icons/ri";
import caos from "../../../assets/svg/caos.light.svg"
import './Sidebar.css'
import { NavLink } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses, menuClasses } from 'react-pro-sidebar';

export default function SidebarMenu() {

    const navigate = [
        { name: 'Dashboard', href: '/home/soon/1', icon: <RiDashboardFill /> },
        { name: 'Inventarios', href: '/home/inventories', icon: <RiCalendarCheckFill /> },
        {
            name: 'Produccion',
            submenu: true,
            submenuItems: [
                { name: 'Recetas', href: '/home/production' },
                { name: 'Activas', href: '/home/production/live' },
            ],
            icon: <RiArchiveFill />
        },
        {
            name: 'Finanzas', href: '',
            submenu: true,
            submenuItems: [
                { name: 'Cuentas bancarias', href: '/home/bank-accounts'},
                { name: 'Facturas', href: '/home/invoices' },
                { name: 'Proveedores', href: '/home/suppliers' }
            ], icon: <RiMoneyPoundBoxFill />
        },
        { name: 'Clientes', href: '/home/customers', icon: <RiUser3Fill /> },
    ]

    return (
        <>

            <aside className="grid gap-1">

                <Sidebar collapsed={false}
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <div className="flex p-5 justify-center items-center">
                        <img src={caos} alt="logo.png" className="w-72" />
                    </div>
                    <Menu
                        rootStyles={{
                            [`.${menuClasses.container}`]: {
                                backgroundColor: 'transparent',
                            },
                        }}


                    >
                        {navigate.map((item, index) => (
                            item.submenu ? ( // Si hay submenu
                                <SubMenu icon={item.icon} label={item.name} key={index} className="SubMenu"> {/* Aplica la clase CSS personalizada */}
                                    {item.submenuItems.map((subItem, subIndex) => (
                                        <NavLink key={subIndex} to={subItem.href}>
                                            <MenuItem>
                                                {subItem.name}
                                            </MenuItem>
                                        </NavLink>
                                    ))}
                                </SubMenu>

                            ) : ( // Si no hay submenu
                                <NavLink key={index} to={item.href}>
                                    <MenuItem icon={item.icon} className="MenuItem"> {/* Aplica la clase CSS personalizada */}
                                        {item.name}
                                    </MenuItem>
                                </NavLink>
                            )
                        ))}
                    </Menu>
                </Sidebar>
            </aside>

        </>
    )
}

