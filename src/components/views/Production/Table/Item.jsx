import React, { useContext, useEffect, useState, useRef } from 'react'
import { Collapse } from 'react-collapse';
import { CSSTransition } from 'react-transition-group';
import { BsFillTrashFill, BsFillPencilFill, BsFillPlayFill, BsPlusCircle } from 'react-icons/bs'
import { ProductionContext } from '../../../../context/Production/ProductionContext';
import { RecipesIngrContext } from '../../../../context/Production/recipes/ingredients/RecipesIngrContext';
import { StepsContext } from '../../../../context/Production/recipes/Steps/StepsContext';
import IngredientsForm from '../Forms/IngredientsForm';
import StepsForm from '../Forms/StepsForm';

export default function Item({ item }) {

    const { deleteRecipeById } = useContext(ProductionContext)
    const { getAllIngrbyId, recipes } = useContext(RecipesIngrContext)
    const { getAllStepsbyId, steps } = useContext(StepsContext)
    const [bottonsIngr, setBottonsIngr] = useState(true)
    const [bottonsSteps, setBottonsSteps] = useState(true)
    const [openFormIngredients, setOpenFormIngredients] = useState(false)
    const [openFormSteps, setOpenFormSteps] = useState(false)
    const [open, setOpen] = useState(false)
    const [dataIngr, setDataIngr] = useState([])
    const [dataSteps, setDataSteps] = useState([])

    const nodeRef = useRef(null);

    // trea la data de los ingredientes
    useEffect(() => {
        getAllIngrbyId(item.id)
            .then((res) => {
                setDataIngr(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [recipes])

    // trae la data de los pasos
    useEffect(() => {
        getAllStepsbyId(item.id)
            .then((res) => {
                setDataSteps(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [steps])


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

                <div className='grid grid-flow-col grid-cols-2 p-5 '>
                    {/* tabla de ingredientes */}
                    <div className='px-2.5'>

                        {/* Botones de opciones */}
                        <CSSTransition nodeRef={nodeRef} in={bottonsIngr} timeout={200} classNames="" unmountOnExit appear={true}
                            onEnter={() => { setOpenFormIngredients(false) }}>
                            <div className='flex gap-5 '>
                                <button className='flex bg-green-500 w-full p-2 rounded-lg justify-center' onClick={() => { setOpenFormIngredients(!openFormIngredients), setBottonsIngr(!bottonsIngr) }}><BsPlusCircle color='ffffff' /></button>
                                <button className='flex bg-yellow-500 w-full p-2 rounded-lg justify-center'><BsFillPencilFill color='ffffff' /></button>
                            </div>
                        </CSSTransition>

                        {/* Formulario nuevo ingrediente */}
                        <IngredientsForm showFormIngredients={openFormIngredients} setBottonsIngr={setBottonsIngr} id_recipe={item.id} />

                        {/* Tabla de datos */}
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
                                        dataIngr == null ? console.log('Sin datos') :
                                            dataIngr.map((items) => (
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
                    <div className='px-2.5 border border-white border-y-0 border-r-0'>

                        {/* Botones de opciones */}
                        <CSSTransition nodeRef={nodeRef} in={bottonsSteps} timeout={200} classNames="" unmountOnExit appear={true}
                            onEnter={() => { setOpenFormSteps(false) }}>
                            <div className='flex gap-5'>
                                <button className='flex bg-green-500 w-full p-2 rounded-lg justify-center' onClick={() => { setOpenFormSteps(!openFormSteps), setBottonsSteps(!bottonsSteps) }}><BsPlusCircle color='ffffff' /></button>
                                <button className='flex bg-yellow-500 w-full p-2 rounded-lg justify-center'><BsFillPencilFill color='ffffff' /></button>
                            </div>
                        </CSSTransition>

                        <StepsForm showFormSteps={openFormSteps} setBottonsSteps={setBottonsSteps} id_recipe={item.id} />

                        <div className='p-5'>
                            {
                                dataSteps == null ? console.log('Sin datos') :
                                    dataSteps.map((items) => (
                                        <div key={items.id}>
                                            {items.description}
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </Collapse >
        </div >
    )
}
