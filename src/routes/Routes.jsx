import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../components/views/Dashboard/Dashboard";
import ErrorPage from '../components/views/Errors/ErrorPage';
import LogIn from "../components/views/LogIn/LogIn";
import Soon from '../components/views/Soon/Soon';
import Inventories from "../components/views/inventories/Inventories";
import InventoriesContextProvider from "../context/Inventories/InventoriesContext";
import SupplierContextProvider from "../context/Buys/Suppliers/SuppliersContext"
import ProductionContextProvider from "../context/Production/ProductionContext";
import Production from "../components/views/Production/Production";
import { InvoicesContextProvider } from "../context/Buys/Invoice/InvoicesContext";
import InvoicesFormNew from "../components/views/Buys/Forms/InvoicesFormNew";
import RawMateContextProvider from "../context/Inventories/Raw Material/RawMateContext";
import Invoices from "../components/views/Buys/Invoices";
import InvoiceItems from "../components/views/Buys/Invoices/InvoiceItems";
import Customers from "../components/views/Customers/Customers";
import CustomersContextProvider from "../context/Customers/CustomersContext";
import CustomersDetails from "../components/views/Customers/CustomersDetails";
import Suppliers from "../components/views/Buys/suppleirs/Suppliers";
import BankAccounts from "../components/views/Buys/Bank-acoounts/BankAccounts";
import BankAccountsContextProvider from "../context/Buys/Banks/BankAccountsContext";

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
                    path: 'invoices',
                    element: <SupplierContextProvider> <InvoicesContextProvider><Invoices /> </InvoicesContextProvider> </SupplierContextProvider>,
                },
                {
                    path: "suppliers",

                    element: <SupplierContextProvider><Suppliers /></SupplierContextProvider>
                },
                {
                    path: 'production',
                    element: <InventoriesContextProvider><ProductionContextProvider> <Production /> </ProductionContextProvider></InventoriesContextProvider>
                },
                {
                    path: "invoice/:id",

                    element: <InvoicesContextProvider><InvoiceItems /></InvoicesContextProvider>
                },
                {
                    path: "invoice/create",

                    element: <RawMateContextProvider><SupplierContextProvider><InvoicesContextProvider><InvoicesFormNew></InvoicesFormNew></InvoicesContextProvider></SupplierContextProvider></RawMateContextProvider>

                }, {
                    path: "customers",

                    element: <CustomersContextProvider><Customers /></CustomersContextProvider>
                },
                {
                    path: "customers/:id",

<<<<<<< HEAD
                    element: <CustomersContextProvider><CustomersDetails /></CustomersContextProvider>
                },
                {
                    path: "production/live",

                    element: <InventoriesContextProvider><ProductionContextProvider> <ProductionLive /> </ProductionContextProvider></InventoriesContextProvider>
=======
                    element:<CustomersContextProvider><CustomersDetails /></CustomersContextProvider>
                },
                {
                    path: "bank-accounts",
                    
                    element:<BankAccountsContextProvider><BankAccounts/></BankAccountsContextProvider>
>>>>>>> 65a393bff5bb89bf88c9f9aa8fc6660495c23448
                }


            ]
        }
    ])

    return routes
}


