import { useEffect, useState } from 'react'
import Axios from "axios";
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [resp, setResp] = useState('')

  useEffect(() => {
    axios({
      url: "http://127.0.0.1:3333/test"
    })
      .then((resp) => {
        console.log(resp)
        setResp(resp)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div className="App">
      {/* {resp} */}
    </div>
  )
}

export default App
