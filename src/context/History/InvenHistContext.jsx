import axios from 'axios';
import { useState, createContext, useContext } from 'react';
import { UserContext } from '../User/UserContext';

export const InvenHistContext = createContext()

export default function InvenHistContextProvider(props) {

  const { token } = useContext(UserContext);
  const [historyRaw, setHistoryRaw] = useState();
  const user = JSON.parse(localStorage.getItem('userData'))

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
    <InvenHistContext.Provider value={{
      historyRaw,
      getHistInve,
      creaHistInve
    }}>
      {props.children}
    </InvenHistContext.Provider>
  );

}