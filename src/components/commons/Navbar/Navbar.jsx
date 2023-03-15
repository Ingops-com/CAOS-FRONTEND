import { useContext, useEffect, useState } from 'react'
import { MdLightMode, MdOutlineLightMode, MdMiscellaneousServices, MdLogout } from "react-icons/md";
import { NavbarContext } from '../../../context/NavbarContext';
import Modal from "react-modal";
import { BiBell } from "react-icons/bi";
import { IoIosAlert } from "react-icons/io";
import './Navbar.css'


function Navbar() {

    const [sizeIcon, setSizeIcon] = useState('1.5rem')
    const [modalOpen, setModalOpen] = useState(false)
    const { theme, setTheme, getTheme, chargeTheme } = useContext(NavbarContext)


    useEffect(() => {
        getTheme()
        chargeTheme(theme)
    }, [theme])

    function handleThemeSwitch(){
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    function handleLogOut() {
        window.location.assign('/')
    }

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <>
            <div className='flex w-full h-16 p-4 place-items-center justify-end'>
                <div className='grid grid-flow-col gap-5'>
                    <div id="logoutButton" className='flex cursor-pointer' onClick={openModal} >
                        <MdLogout id='MdLogout' size={sizeIcon} />
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

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                className=' dark:bg-dark-ing-800 dark:text-white p-5'
            >
                <div className='flex items-center justify-center m-1'>
                    <IoIosAlert size={'3rem'} />
                </div>
                <div className='text-center flex items-center justify-center'>
                    <div className='text-xl'>
                        DESEAS CERRAR SESION?
                    </div>
                </div>
                <div className='flex items-center justify-between p-5'>
                    <button className='bg-red-600 text-xl p-5' onClick={closeModal}>CANCELAR</button>
                    <button className='bg-emerald-500 text-xl p-5' onClick={handleLogOut}>ACEPTAR</button>
                </div>
            </Modal>
        </>
    )
}

export default Navbar
