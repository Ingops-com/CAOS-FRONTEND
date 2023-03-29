import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../User/UserContext'

export const InventoriesContext = createContext()

export default function InventoriesContextProvider(props) {

  const { token } = useContext(UserContext)
  const [data, setData] = useState([])
  const [date, setDate] = useState(0);
  const [valTotalRawMate, setValTotalRawMate] = useState(0);
  const [editData, setEditData] = useState(null)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [showFormNew, setshowFormNew] = useState(false)
  const [showFormCategorie, setShowFormCategorie] = useState(false)
  const cero = [
    {
      "id": 0,
      "stock": 0,
      "price": 0,
      "createdAt": "0",
      "raw_material": {
        "name": "",
        "category_raw_material": {
          "name": ""
        },
        "unit_measure": {
          "name": ""
        }
      }
    }
  ]

  useEffect(() => {
    getValTotalRawMate()
  }, [data])

  function getAllInvRawMate() {
    axios({
      method: "GET",
      url: "/inventories-raw-material",
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        console.log(res.data)
        if () {
          console.log("entro vacio")
          setData(cero)
          setDate(cero.slice(-1)[0]);

        } else {
          setData(res.data)
          setDate(res.data.slice(-1)[0]);
        }
      })
      .catch((err) => {
        console.log("Error getAll Inventories " + err)
      })
  }

  function getValTotalRawMate() {
    let total = 0
    data.forEach((dataPrice) => {
      total += dataPrice.price
    });
    setValTotalRawMate(total)
  }

  const createItemInventorie = async (rawId) => {
    await axios({
      method: "POST",
      url: "/inventories-raw-material/",
      headers: {
        'Authorization': token
      },
      data: {
        raw_material_id: rawId,
        stock: 0,
        price: 0
      }
    })
      .then((res) => {
        getAllInvRawMate()
      })
      .catch((err) => {
        console.log("Error getAll Unit Measure " + err)
      })
  }

  const updateItemById = async (data) => {
    await axios({
      method: "PATCH",
      url: `/inventories-raw-material/${editData.id}`,
      headers: {
        'Authorization': token
      },
      data: {
        "stock": data[0],
        "price": data[1]
      }
    })
      .then((res) => {
        getAllInvRawMate()
        toast.success('STOCK AGREGADO')
      })
      .catch((err) => {
        toast.error('ERROR AL AGREGAR')
        console.log("error updateItemById" + err)
      })
  }

  const deleteById = async (id) => {
    await axios({
      method: "DELETE",
      url: `/inventories-raw-material/${id}`,
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        getAllInvRawMate()
        toast.success('PRODUCTO BORRADO')
      })
      .catch((err) => {
        toast.error('ERROR AL BORRAR')
        console.log("error updateItemById" + err)
      })
  }

  return (
    <InventoriesContext.Provider value={{
      getAllInvRawMate,
      createItemInventorie,
      setShowFormEdit,
      updateItemById,
      setEditData,
      setshowFormNew,
      showFormNew,
      data,
      date,
      valTotalRawMate,
      showFormEdit,
      editData,
      showFormCategorie,
      setShowFormCategorie,
      deleteById
    }}>
      {props.children}
    </InventoriesContext.Provider>
  )
}

