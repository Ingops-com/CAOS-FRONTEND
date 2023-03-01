import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/views/Dashboard/Dashboard";
import ErrorPage from './components/views/Errors/ErrorPage';
import LogIn from "./components/views/LogIn/LogIn";
import { UserContextProvider } from './context/UserContext';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Dashboard />
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  )
}

export default App
