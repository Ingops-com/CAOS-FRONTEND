import axios from "axios";
import Routes from "./routes/Routes.jsx";
import classNames from 'classnames';
import { RouterProvider } from "react-router-dom";
import { UserContextProvider } from './context/User/UserContext';
import { DashContextProvider } from "./context/Dashboard/DashContext";
import HistoriesContextProvider from "./context/History/InvenHistContext.jsx";

import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
// import 'primeflex/primeflex.css'; // flex

import './App.css'


function App() {

  const URL_API = import.meta.env.VITE_API_URL

  axios.defaults.baseURL = URL_API

  const routes = Routes()

  return (
    <PrimeReactProvider>
      <UserContextProvider>
        <HistoriesContextProvider>
          <DashContextProvider>
            <RouterProvider router={routes} />
          </DashContextProvider>
        </HistoriesContextProvider>
      </UserContextProvider>
    </PrimeReactProvider>
  )
}

export default App
