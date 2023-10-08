import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgChevronDown } from "react-icons/cg";

export default function Items({ item }) {
    const [subMenuOpen, setSubMenuOpen] = useState(true)

    return (
        <>
            <NavLink
                to={item.href}
                className={({ isActive }) => {
                    return (
                        'flex w-full items-center justify-around px-2 py-1 rounded-md transition-all ease-linear duration-100 dark:hover:bg-sidebar-selected-900 hover:bg-sidebar-selected ' +
                        (isActive ? 'bg-sidebar-selected dark:bg-sidebar-selected-900' : '')
                    );
                }}
            >
                <div className="flex items-center px-1">{item.icon}</div>
                <div className="flex w-full items-center px-1">{item.name}</div>

                <div>
                    {item.submenu && (
                        <div className={`${subMenuOpen && 'rotate-180'}`} onClick={() => setSubMenuOpen(!subMenuOpen)}><CgChevronDown /></div>

                    )}
                </div>

            </NavLink>

            <span className="grid gap-1">
                {/* SubItems */}
                {item.submenu && subMenuOpen && (
                    item.submenuItems.map((item, index) => (
                        <NavLink
                            to={item.href}
                            key={index}
                            className={({ isActive }) => {
                                return (
                                    'flex w-full items-center text-sm justify-around pl-6 px-2 py-1 rounded-md transition-all ease-linear duration-100 dark:hover:bg-sidebar-selected-900 hover:bg-sidebar-selected' +
                                    (isActive ? ' bg-sidebar-selected dark:bg-sidebar-selected-900' : '')
                                );
                            }}
                        >
                            <div className="flex w-full items-center px-1">{item.name}</div>
                        </NavLink>
                    ))
                )}
            </span>
        </>
    )
}
