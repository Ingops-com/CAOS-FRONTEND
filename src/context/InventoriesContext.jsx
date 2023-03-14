import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { UserContext } from './UserContext'

export const InventoriesContext = createContext()

export default function InventoriesContextProvider(props) {

  const { token } = useContext(UserContext)
  const [data, setData] = useState([])
  const [date, setDate] = useState(0);
  const [valTotalRawMate, setValTotalRawMate] = useState(0);

  useEffect(() => {
    getValTotalRawMate()
  }, [data])


  function getAllRawMate() {
    console.log(token)
    axios({
      method: "GET",
      url: "/inventories-raw-material",
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log("Error getAll Inventories " + err)
      })
  }

  function getAllInve() {
    axios({
      method: "GET",
      url: "/inventories",
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        setDate(res.data.pop());
      })
      .catch((err) => {
        setDate("Error getAllInve " + err)
      })
  }

  function getValTotalRawMate() {
    let total = 0
    data.forEach((dataPrice) => {
      total += dataPrice.price
    });
    setValTotalRawMate(total)
  }

  return (
    <InventoriesContext.Provider value={{
      getAllRawMate,
      getAllInve,
      data,
      date,
      valTotalRawMate
    }}>
      {props.children}
    </InventoriesContext.Provider>
  )
}

