import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard";
import ErrorPage from '../views/Errors/ErrorPage';
import LogIn from "../views/LogIn/LogIn";

export default function Routes() {

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
  return routes
}
