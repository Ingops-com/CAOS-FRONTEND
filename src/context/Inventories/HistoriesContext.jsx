import axios from 'axios';
import { useState, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { UserContext } from '../User/UserContext';

export const HistoriesContext = createContext()
const user = JSON.parse(localStorage.getItem('userData'))

export default function HistoriesContextProvider(props) {

  const { token } = useContext(UserContext);
  const [historyRaw, setHistoryRaw] = useState();


  function getHistInve() {
    axios({
      method: "GET",
      url: "/hisyory-raw-mate",
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        setHistoryRaw(res.data)
      })
  }


  const creaHistInve = async (nameRaw, cuantity, status) => {
    await axios({
      method: "POST",
      url: "/history-raw-mate/",
      headers: {
        'Authorization': token
      },
      data: {
        "user": user.name,
        "object": nameRaw,
        "cuantity": cuantity,
        "status": status
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }



  return (
    <HistoriesContext.Provider value={{
      historyRaw,
      getHistInve,
      creaHistInve
    }}>
      {props.children}
    </HistoriesContext.Provider>
  );

}