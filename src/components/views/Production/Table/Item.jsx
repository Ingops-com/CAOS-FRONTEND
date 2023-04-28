import React, { useContext, useEffect, useState, useRef } from 'react'
import { Collapse } from 'react-collapse';
import { CSSTransition } from 'react-transition-group';
import { BsFillTrashFill, BsFillPencilFill, BsFillPlayFill, BsPlusCircle } from 'react-icons/bs'
import { ProductionContext } from '../../../../context/Production/ProductionContext';
import { RecipesIngrContext } from '../../../../context/Production/recipes/ingredients/RecipesIngrContext';
import IngredientsForm from '../Forms/IngredientsForm';

export default function Item({ item }) {

    const { deleteRecipeById } = useContext(ProductionContext)
    const { getAllIngrbyId, recipes } = useContext(RecipesIngrContext)
    const [open, setOpen] = useState(false)
    const [bottons, setBottons] = useState(true)
    const [openFormIngredients, setOpenFormIngredients] = useState(false)
    const [data, setData] = useState([])

    const nodeRef = useRef(null);

    useEffect(() => {
        getAllIngrbyId(item.id)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [data, recipes])

    return (
        <div className='w-full'>
            {/* header */}
            <div className='flex place-content-between items-center p-5 dark:bg-dark-ing-700' onClick={(e) => { setOpen(!open) }}>
                <div>
                    {item.name}
                </div>
                <div>
                    <button className='bg-green-500 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillPlayFill /></button>
                    <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2'><BsFillPencilFill /></button>
                    <button className='bg-red-500 p-2 rounded-lg pr-4 pl-4 m-2'
                        onClick={() => {
                            deleteRecipeById(item.id)
                        }}
                    ><BsFillTrashFill color='ffffff' /></button>
                </div>
            </div>
            {/* body */}
            <Collapse isOpened={open}>
                <div className='flex items-center p-5'>
                    <p className='text-xl text-green-300'>Descripcion:</p>
                    <p className='mx-2.5'>{item.description}</p>
                </div>

                <div className='grid grid-flow-col grid-cols-2 '>
                    {/* tabla de ingredientes */}
                    <div className=' p-2.5 '>

                        {/* Botones de opciones */}

                        <CSSTransition nodeRef={nodeRef} in={bottons} timeout={200} classNames="" unmountOnExit appear={true}
                            onEnter={() => { setOpenFormIngredients(false) }}>
                            <div className='flex gap-5 '>
                                <button className='flex bg-green-500 w-full p-2 rounded-lg justify-center' onClick={() => { setOpenFormIngredients(!openFormIngredients), setBottons(!bottons) }}><BsPlusCircle color='ffffff' /></button>
                                <button className='flex bg-yellow-500 w-full p-2 rounded-lg justify-center'><BsFillPencilFill color='ffffff' /></button>
                            </div>
                        </CSSTransition>


                        <IngredientsForm showFormIngredients={openFormIngredients} setBottons={setBottons} id_recipe={item.id} />

                        <div className='m-2.5'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th>Ingrediente</th>
                                        <th>Porcentaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data == null ? console.log('no hay') :
                                            data.map((items) => (
                                                <tr key={items.id} className='text-center'>
                                                    <td>{items.raw_material.name}</td>
                                                    <td>{items.percent} %</td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* lissta de pasos */}
                    <div className='p-2.5'>
                        <div className='flex gap-5 m-5'>
                            <button className='flex bg-green-500 w-full p-2 rounded-lg justify-center'><BsPlusCircle color='ffffff' /></button>
                            <button className='flex bg-yellow-500 w-full p-2 rounded-lg justify-center'><BsFillPencilFill color='ffffff' /></button>
                        </div>
                        <div className='bg-slate-500 p-5'>
                            <div className='flex gap-5'>
                                <h1>1.</h1>
                                <p>EL paso</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Collapse >
        </div >
    )
}
