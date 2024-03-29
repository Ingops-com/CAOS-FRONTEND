import axios from 'axios'
import { useState, createContext, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { UserContext } from '../User/UserContext'
import { InvenHistContext } from '../History/InvenHistContext.jsx'

export const InventoriesContext = createContext()

export default function InventoriesContextProvider(props) {

  const { token } = useContext(UserContext)
  // const { creaHistInve } = useContext(InvenHistContext)
  const [data, setData] = useState([])
  const [date, setDate] = useState([]);
  const [editData, setEditData] = useState(null)
  const [datafilter, setDatafilter] = useState("")
  const [valTotalRawMate, setValTotalRawMate] = useState(0);
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [showFormNew, setshowFormNew] = useState(false)
  const [showFormCategorie, setShowFormCategorie] = useState(false)

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
        setData(res.data)
        setDatafilter(res.data)
        if (res.data != '') {
          setDate(res.data.slice(-1)[0]);
        }
        else {
          setDate({ 'createdAt': '00-00-0000' })
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
        // creaHistInve(rawId, 0, '0')
      })
      .catch((err) => {
        console.log("Error create item inventorie " + err)
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
        // creaHistInve(editData.raw_material_id, data[2], '1')
        toast.success('STOCK AGREGADO')
      })
      .catch((err) => {
        toast.error('ERROR AL AGREGAR')
        console.log("error updateItemById" + err)
      })
  }

  const deleteById = async (id, stock, rawId, name) => {
    await axios({
      method: "DELETE",
      url: `/inventories-raw-material/${id}`,
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {


        axios({
          method: "DELETE",
          url: `/raw-material/byname/${name}`,
          headers: {
            'Authorization': token
          }
        })
          .then((res) => {
            getAllInvRawMate()
            // creaHistInve(rawId, stock, '2')
            toast.success('PRODUCTO BORRADO')
          })
          .catch((err) => {
            toast.error('ERROR AL BORRAR')
            console.log("error updateItemById" + err)
          })

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
      setData,
      datafilter,
      deleteById
    }}>
      {props.children}
    </InventoriesContext.Provider>
  )

}

