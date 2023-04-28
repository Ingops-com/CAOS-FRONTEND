import axios from 'axios';
import { useEffect } from "react";
import { useState, createContext, useContext } from 'react';
import { UserContext } from '../User/UserContext';

export const InvenHistContext = createContext()

export default function InvenHistContextProvider(props) {

  const { token } = useContext(UserContext);
  const [historyRaw, setHistoryRaw] = useState(null);
  const user = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if (historyRaw == null) {
      getHistInve()
    }
  }, [historyRaw])

  function getHistInve() {
    axios({
      method: "GET",
      url: "/history-raw-mate",
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
      getHistInve()
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