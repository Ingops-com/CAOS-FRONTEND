import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../components/views/Dashboard/Dashboard";
import ErrorPage from '../components/views/Errors/ErrorPage';
import LogIn from "../components/views/LogIn/LogIn";
import Soon from '../components/views/Soon/Soon';
import Inventories from "../components/views/inventories/Inventories";
import Buys from "../components/views/Buys/Buys"
import InventoriesContextProvider from "../context/Inventories/InventoriesContext";
import { BuysContextProvider } from "../context/Buys/BuysContext";
import SupplierContextProvider from "../context/Buys/Suppliers/SuppliersContext"
import ProductionContextProvider from "../context/Production/ProductionContext";
import Production from "../components/views/Production/Production";

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

                    element: <SupplierContextProvider> <BuysContextProvider><Buys /> </BuysContextProvider> </SupplierContextProvider>
                },
                {
                    path: 'production',
                    element: <InventoriesContextProvider><ProductionContextProvider> <Production /> </ProductionContextProvider></InventoriesContextProvider>
                }

            ]
        }
    ])

    return routes
}


