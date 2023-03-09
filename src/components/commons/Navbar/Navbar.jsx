import { useEffect, useState } from 'react'
import { MdLightMode, MdOutlineLightMode, MdMiscellaneousServices, MdLogout } from "react-icons/md";
import { BiBell } from "react-icons/bi";


function Navbar() {

    const [sizeIcon, setSizeIcon] = useState('1.5rem')
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-color-schema: dark)').matches) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.getElementById('sunIcon').classList.remove('hidden')
            document.getElementById('sunDarkIcon').classList.add('hidden')
        } else {
            document.documentElement.classList.remove('dark');
            document.getElementById('sunDarkIcon').classList.remove('hidden')
            document.getElementById('sunIcon').classList.add('hidden')
        }
    }, [theme])

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className='flex w-full h-16 p-4 place-items-center justify-end'>
            <div className='grid grid-flow-col gap-5'>
                <div id="logoutButton" className='flex'>
                    <MdLogout id='MdLogout' size={sizeIcon}   />
                    <div className='dark:text-white'>Log Out</div>
                </div>
                <div id="iconConfig" className='hi' >
                    <MdMiscellaneousServices size={sizeIcon} />
                </div>
                <div id="notificationIcon" className='cursor-pointer'>
                    <BiBell size={sizeIcon} />
                </div>
                <div id='darkmodeIcons' className='flex cursor-pointer' onClick={handleThemeSwitch}>
                    <div id='sunIcon' className='hidden'>
                        <MdLightMode size={sizeIcon} />
                    </div>
                    <div id='sunDarkIcon'>
                        <MdOutlineLightMode size={sizeIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
