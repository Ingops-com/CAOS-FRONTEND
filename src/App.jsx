import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from './components/routes/Routes';

function App() {
  const routes = Routes()
  
  return (
    <RouterProvider router={routes} />
  )
}

export default App
