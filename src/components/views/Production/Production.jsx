import { useContext, useEffect, useState } from 'react'

import { Toaster } from "react-hot-toast";
import { ProductionContext } from '../../../context/Production/ProductionContext.jsx';
import Cards from '../../commons/cards/Cards.jsx'
import RecipeForm from './Forms/RecipeForm.jsx';
import Item from './Table/Item.jsx';
import "./Production.css"


export default function Production() {

  const { getAllRecipes, dataRecipes } = useContext(ProductionContext)
  const [ShowFormRecipes, setShowFormRecipes] = useState(false)

  useEffect(() => {
    if (dataRecipes.length == 0) {
      getAllRecipes()
    }
  }, [])

  return (
    <>

      {/* notificaciones */}
      <div><Toaster /></div>

      {/* tarjetas de datos */}
      <div className='w-full h-auto flex justify-center gap-4 mt-5 mb-5 items-center '>
        <Cards
          titleCard='FECHA ULTIMA PRODUCCION'
          bodyCard={''}
          cardNum='card4'
        />
        <Cards
          titleCard='COMIDA TOTAL'
          bodyCard={''}
          cardNum='card5'
        />
      </div>

      {/* botones */}
      <div className='flex justify-center mt-5 mb-5'>
        <button
          className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-cyan-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
          onClick={() => { setShowFormRecipes(!ShowFormRecipes) }}
        >
          NUEVA RECETA
        </button>

        <button
          className="middle none center mr-3 rounded-lg bg-orange-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-cyan-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
          onClick={() => { window.location.assign('/home/inventories') }}
        >
          VER MATERIA PRIMA
        </button>
      </div>

      {/* Formulario nueva receta */}
      <RecipeForm showFormRecipes={ShowFormRecipes} />

      {/* Tabla de recetas */}
      <div className='grid w-full shadow-xl p-5 mt-5 mb-5 bg-white dark:shadow-none dark:bg-dark-ing-800 '>
        {dataRecipes == null ? console.log('Sin datos') :
          <div>
            {
              dataRecipes.map((item) => (
                <Item key={item.id} item={item}></Item>
              ))
            }
          </div>
        }
      </div>
    </>
  )
}
