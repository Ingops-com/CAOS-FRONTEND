import { RouterProvider } from "react-router-dom";
import Routes from "./routes/routes.jsx";
import axios from "axios";
import { UserContextProvider } from './context/User/UserContext';
import { DashContextProvider } from "./context/Dashboard/DashContext";
import HistoriesContextProvider from "./context/History/InvenHistContext.jsx";
import './App.css'

function App() {

  const URL_API = import.meta.env.VITE_API_URL

  axios.defaults.baseURL = URL_API

  const routes = Routes()

  return (
    <UserContextProvider>
      <HistoriesContextProvider>
        <DashContextProvider>
          <RouterProvider router={routes} />
        </DashContextProvider>
      </HistoriesContextProvider>
    </UserContextProvider>
  )
}

export default App
