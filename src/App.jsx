import { RouterProvider } from "react-router-dom";
import Routes from "./routes/routes.jsx";
import axios from "axios";
import { UserContextProvider } from './context/UserContext';
import './App.css'

function App() {

  const URL_API = import.meta.env.VITE_API_URL

  axios.defaults.baseURL = URL_API

  const routes = Routes()

  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  )
}

export default App
