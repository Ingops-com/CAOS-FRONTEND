import { createBrowserRouter} from "react-router-dom";

import Dashboard from "../components/views/Dashboard/Dashboard";
import ErrorPage from '../components/views/Errors/ErrorPage';
import LogIn from "../components/views/LogIn/LogIn";
import Soon from '../components/views/Soon/Soon';
import Inventories from "../components/views/inventories/Inventories";
import Buys from "../components/views/Buys/Buys"
import InventoriesContextProvider from "../context/Inventories/InventoriesContext";
import { BuysContextProvider } from "../context/Buys/BuysContext";

export default function Routes() {
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
                    element: <InventoriesContextProvider> <Inventories /> </InventoriesContextProvider>
                },
                {
                    path: 'buys',
                    element: <BuysContextProvider><Buys /> </BuysContextProvider>
                }

            ]
        }
    ])

    return routes
}


