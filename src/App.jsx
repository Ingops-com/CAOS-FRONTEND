import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from './context/UserContext';
import Dashboard from "./components/views/Dashboard/Dashboard";
import ErrorPage from './components/views/Errors/ErrorPage';
import LogIn from "./components/views/LogIn/LogIn";
import Soon from './components/views/Soon/Soon';
import Inventories from "./components/views/inventories/inventories";
import './App.css'

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Dashboard />,
      children: [
        {
          path: 'soon/:id',
          element: <Soon />
        },
        {
          path: 'inventories',
          element: <Inventories />
        }
        
      ]
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={routes} />
    </UserContextProvider>
  )
}

export default App
