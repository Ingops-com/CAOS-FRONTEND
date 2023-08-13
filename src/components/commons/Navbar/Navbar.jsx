import { useContext, useEffect, useState } from 'react'
import { MdLightMode, MdOutlineLightMode, MdMiscellaneousServices, MdLogout } from "react-icons/md";
import { NavbarContext } from '../../../context/Dashboard/Navbar/NavbarContext';
// import Modal from "react-modal";
import { BiBell } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import './Navbar.css'
import Modal from '../Modal/Modal';


function Navbar() {

    const [sizeIcon, setSizeIcon] = useState('1.5rem')
    const [modalOpen, setModalOpen] = useState(false)
    const { theme, setTheme, getTheme, chargeTheme } = useContext(NavbarContext)


    useEffect(() => {
        getTheme()
    }, [])

    useEffect(() => {
        chargeTheme(theme)
    }, [theme])

    function handleThemeSwitch() {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    function handleLogOut() {
        window.location.assign('/')
    }

    return (
        <>
            <div className='flex w-full h-16 p-4 place-items-center justify-end'>
                <div className='grid grid-flow-col gap-5'>
                    {/* Boton de logout */}
                    <div id="logoutButton" className='flex cursor-pointer' onClick={() => setModalOpen(true)}>
                        <MdLogout id='MdLogout' size={sizeIcon} />
                        <div className='dark:text-white'>Log Out</div>
                    </div>
                    {/* Boton de configuraciones */}
                    <div id="iconConfig" className='hi' >
                        <MdMiscellaneousServices size={sizeIcon} />
                    </div>
                    {/* Notificaciones */}
                    <div id="notificationIcon" className='cursor-pointer'>
                        <BiBell size={sizeIcon} />
                    </div>
                    {/* theme */}
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

            <Modal open={modalOpen} onClose={() => {setModalOpen(false)}}>
                
                    <div className='flex items-center justify-center m-1'>
                        <IoIosAlert size={'3rem'} color='black' />
                    </div>
                    <div className='text-black text-center flex items-center justify-center'>
                        <div className='text-xl'>
                            DESEAS CERRAR SESION?
                        </div>
                    </div>
                    <div className='flex items-center justify-between p-5'>
                        <button className='bg-red-600 text-xl p-5' onClick={() => setModalOpen(false)} >CANCELAR</button>
                        <button className='bg-emerald-500 text-xl p-5' onClick={handleLogOut}>ACEPTAR</button>
                    </div>
            </Modal>
        </>
    )
}

export default Navbar
