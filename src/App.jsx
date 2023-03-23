import { RouterProvider } from "react-router-dom";
import Routes from "./routes/routes.jsx";
import axios from "axios";
import { UserContextProvider } from './context/User/UserContext';
import { DashContextProvider } from "./context/Dashboard/DashContext";
import './App.css'

function App() {

  const URL_API = import.meta.env.VITE_API_URL

  axios.defaults.baseURL = URL_API

  const routes = Routes()

  return (
    <UserContextProvider>
      <DashContextProvider>
        <RouterProvider router={routes} />
      </DashContextProvider>
    </UserContextProvider>
  )
}

export default App
