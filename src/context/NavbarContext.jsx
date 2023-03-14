import { createContext, useState } from 'react'
import axios from 'axios';

export const NavbarContext = createContext();

export function NavbarContextProvider(props) {

    const [theme, setTheme] = useState(null)

    function getTheme() {
        let userData = JSON.parse(localStorage.getItem('userData'))

        axios.get(`/users/theme/${userData.id}`)
            .then((data) => {
                let Theme = JSON.stringify(data.data)
                Theme = JSON.parse(Theme)
                setTheme(Theme.theme)
            })
            .catch((Error) => {
                console.log(Error)
            })
    }

    function chargeTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.getElementById('sunIcon').classList.remove('hidden')
            document.getElementById('sunDarkIcon').classList.add('hidden')
        } else {
            document.documentElement.classList.remove('dark');
            document.getElementById('sunDarkIcon').classList.remove('hidden')
            document.getElementById('sunIcon').classList.add('hidden')
        }
    }

    return (
        <NavbarContext.Provider value={{ theme, setTheme, getTheme, chargeTheme }}>
            {props.children}
        </NavbarContext.Provider>
    )
}

