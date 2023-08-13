import React, { useContext, useEffect, useState, useRef } from 'react'
import { Collapse } from 'react-collapse';
import { CSSTransition } from 'react-transition-group';
import { BsFillTrashFill, BsFillPencilFill, BsFillPlayFill, BsPlusCircle, BsFillEyeFill, BsSaveFill, BsXCircleFill } from 'react-icons/bs'
import { ProductionContext } from '../../../../context/Production/ProductionContext';
import { RecipesIngrContext } from '../../../../context/Production/recipes/ingredients/RecipesIngrContext';
import { StepsContext } from '../../../../context/Production/recipes/Steps/StepsContext';
import IngredientsForm from '../Forms/IngredientsForm';
import StepsForm from '../Forms/StepsForm';

export default function Item({ item }) {

    const { deleteRecipeById, deleteStepsByRecipe, deleteIngrByRecipe, updateRecipes, verifyIngr } = useContext(ProductionContext)
    const { getAllIngrbyId, updateIngr, deleteIngr, recipes } = useContext(RecipesIngrContext)
    const { getAllStepsbyId, updateStep, deleteStep, steps } = useContext(StepsContext)

    const [bottonsIngr, setBottonsIngr] = useState(true)
    const [bottonsSteps, setBottonsSteps] = useState(true)
    const [openFormIngredients, setOpenFormIngredients] = useState(false)
    const [openFormSteps, setOpenFormSteps] = useState(false)
    const [open, setOpen] = useState(false)
    const [dataIngr, setDataIngr] = useState([])
    const [dataSteps, setDataSteps] = useState([])
    const [updateInput, setUpdateInput] = useState(false)
    const [updateIngrControl, setUpdateIngrControl] = useState(false)
    const [updateIngrItem, setupdateIngrItem] = useState(0)
    const [updateStepControl, setUpdateStepControl] = useState(false)
    const [updateStepItem, setupdateStepItem] = useState(0)
    const [openModal, setOpenModal] = useState(false)


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

    function updateHandler(id, oldName, oldDescription) {
        setUpdateInput(!updateInput)
        setOpen(true)

        if (updateInput) {
            const newNameInput = document.getElementById('nameUpdate').value;
            const newDescriptionInput = document.getElementById('descriptionUpdate').value;

            if (!newNameInput && !newDescriptionInput) {
                return;
            }

            const newName = newNameInput.toUpperCase() || oldName;
            const newDescription = newDescriptionInput.toUpperCase() || oldDescription;

            updateRecipes(id, newName, newDescription);
        }
    }

    function updateIngrHandler(id, oldPercent) {
        setUpdateIngrControl(!updateIngrControl)
        setupdateIngrItem(id)

        if (updateIngrControl) {
            const newPercentInput = document.getElementById('percentUpdate').value;

            if (!newPercentInput) {
                return;
            }

            const newPercent = newPercentInput || oldPercent;

            updateIngr(id, newPercent);
        }
    }

    function updateStepHandler(id, oldDescription) {
        setUpdateStepControl(!updateStepControl)
        setupdateStepItem(id)

        if (updateStepControl) {
            const newDescriptionInput = document.getElementById('descriptionStepUpdate').value;

            if (!newDescriptionInput) {
                return
            }

            const newDescription = newDescriptionInput || oldDescription;

            updateStep(id, newDescription)
        }
    }

    function deleteIngrHandler(id) {
        deleteIngr(id)
    }

    function deleteStepHandler(id) {
        deleteStep(id)
    }

    function playHandler() {
        verifyIngr(dataIngr)
    }

    return (
        <>
            <div className='w-full'>
                {/* header */}
                <div className='flex place-content-between items-center p-5 dark:bg-dark-ing-700'>
                    <div>
                        {
                            !updateInput ? item.name :
                                <input
                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-blue-500   disabled:border-0 disabled:bg-blue-gray-50"
                                    type='text'
                                    placeholder={item.name}
                                    id='nameUpdate'
                                />
                        }
                    </div>
                    {/* BOTONER DE ACCIONES DENTRO DE CADA ITEM */}
                    <div>
                        <button className='bg-blue-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={(e) => { setOpen(!open) }}><BsFillEyeFill /></button>
                        <button className='bg-green-500 p-2 rounded-lg pr-4 pl-4 m-2' onClick={playHandler}><BsFillPlayFill /></button>
                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-2 transition-all ease-in-out'
                            onClick={() => {
                                updateHandler(item.id, item.name, item.description)
                            }}
                        >
                            {
                                !updateInput ? <BsFillPencilFill /> : <BsSaveFill className='mx-5' />
                            }</button>
                        <button className='bg-red-500 p-2 rounded-lg pr-4 pl-4 m-2'
                            onClick={() => {
                                deleteStepsByRecipe(item.id)
                                deleteIngrByRecipe(item.id)
                                deleteRecipeById(item.id)
                            }}
                        ><BsFillTrashFill /></button>
                    </div>
                </div>
                {/* body */}
                <Collapse isOpened={open}>
                    <div className='flex items-center p-5'>
                        <p className='text-xl text-green-500'>Descripcion:</p>
                        {
                            updateInput == false ?
                                <p className='mx-2.5'>{item.description}</p>
                                :
                                <input
                                    className="peer h-full m-2.5 rounded-[7px] border border-blue-gray-200 bg-transparent p-3 p-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-blue-500   disabled:border-0 disabled:bg-blue-gray-50"
                                    type='text'
                                    placeholder={item.description}
                                    id='descriptionUpdate'
                                />
                        }

                    </div>

                    <div className='grid grid-flow-col grid-cols-2 p-5 '>
                        {/* tabla de ingredientes */}
                        <div className='px-2.5'>

                            {/* Botones de opciones */}
                            <CSSTransition nodeRef={nodeRef} in={bottonsIngr} timeout={200} classNames="" unmountOnExit appear={true}
                                onEnter={() => { setOpenFormIngredients(false) }}>
                                <div className='flex gap-5 '>
                                    <button className='flex bg-green-500 w-full p-2 rounded-lg justify-center' onClick={() => { setOpenFormIngredients(!openFormIngredients), setBottonsIngr(!bottonsIngr) }}><BsPlusCircle color='ffffff' /></button>
                                    {/* <button className='flex bg-yellow-500 w-full p-2 rounded-lg justify-center'><BsFillPencilFill color='ffffff' /></button> */}
                                </div>
                            </CSSTransition>

                            {/* Formulario nuevo ingrediente */}
                            <IngredientsForm showFormIngredients={openFormIngredients} setBottonsIngr={setBottonsIngr} id_recipe={item.id} />

                            {/* Tabla de datos */}
                            <div className='m-2.5 max-h-80 overflow-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='bg-slate-200 dark:bg-dark-ing-700'>
                                            <th>Ingrediente</th>
                                            <th>Porcentaje</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataIngr == null ? console.log('Sin datos') :
                                                dataIngr.map((items) => (
                                                    <tr key={items.id} className='text-center m-5'>

                                                        {
                                                            updateIngrControl && updateIngrItem === items.id ?
                                                                <>
                                                                    <td>{items.raw_material.name}</td>
                                                                    <td><input
                                                                        className="rounded-[7px] w-[60%] text-center border border-blue-gray-200 bg-transparent p-2 font-sans text-sm text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-t-blue-gray-200  focus:border-blue-500 "
                                                                        type='text'
                                                                        placeholder={items.percent}
                                                                        id='percentUpdate'
                                                                    /></td>
                                                                </>
                                                                :
                                                                <>
                                                                    <td>{items.raw_material.name}</td>
                                                                    <td>{items.percent} %</td>
                                                                </>
                                                        }

                                                        {
                                                            updateIngrControl && updateIngrItem === items.id ?
                                                                <>
                                                                    <td>
                                                                        <button className='bg-blue-500 p-2 rounded-lg pr-4 pl-4 m-1' onClick={() => updateIngrHandler(items.id, items.percent)}><BsXCircleFill color='ffffff' /></button>
                                                                    </td>
                                                                </>
                                                                :
                                                                <>
                                                                    <td>
                                                                        <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-1' onClick={() => updateIngrHandler(items.id, '')}><BsFillPencilFill color='ffffff' /></button>
                                                                        <button className='bg-red-500 p-2 rounded-lg pr-4 pl-4 m-1' onClick={() => deleteIngrHandler(items.id)}><BsFillTrashFill color='ffffff' /></button>
                                                                    </td>
                                                                </>
                                                        }


                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* lista de pasos */}
                        <div className='px-2.5 border border-black dark:border-white border-y-0 border-r-0'>

                            {/* Botones de opciones */}
                            <CSSTransition nodeRef={nodeRef} in={bottonsSteps} timeout={200} classNames="" unmountOnExit appear={true}
                                onEnter={() => { setOpenFormSteps(false) }}>
                                <div className='flex gap-5'>
                                    <button className='flex bg-green-500 w-full p-2 rounded-lg justify-center' onClick={() => { setOpenFormSteps(!openFormSteps), setBottonsSteps(!bottonsSteps) }}><BsPlusCircle color='ffffff' /></button>
                                </div>
                            </CSSTransition>

                            <StepsForm showFormSteps={openFormSteps} setBottonsSteps={setBottonsSteps} id_recipe={item.id} />

                            <div className='p-5'>
                                {
                                    dataSteps == null ? console.log('Sin datos') :
                                        dataSteps.map((items, index) => (
                                            <div className='flex place-content-between' key={items.id}>

                                                {
                                                    updateStepControl && updateStepItem == items.id ?
                                                        <div className='flex place-content-center'>
                                                            <input
                                                                className="rounded-[7px] text-center border border-blue-gray-200 bg-transparent font-sans text-sm text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-t-blue-gray-200  focus:border-blue-500 "
                                                                type='text'
                                                                placeholder={items.description}
                                                                id='descriptionStepUpdate'
                                                            />
                                                        </div>
                                                        :
                                                        <div className='flex gap-3'>
                                                            <div>{index + 1}.</div>
                                                            {items.description}
                                                        </div>
                                                }
                                                {
                                                    updateStepControl && updateStepItem == items.id ?

                                                        <div className=''>
                                                            <button className='bg-blue-500 p-2 rounded-lg pr-4 pl-4 m-1' onClick={() => updateStepHandler(items.id, '')}><BsXCircleFill color='ffffff' /></button>
                                                        </div>
                                                        :
                                                        <div className=''>
                                                            <button className='bg-yellow-500 p-2 rounded-lg pr-4 pl-4 m-1' onClick={() => updateStepHandler(items.id, '')}><BsFillPencilFill color='ffffff' /></button>
                                                            <button className='bg-red-500 p-2 rounded-lg pr-4 pl-4 m-1' onClick={() => deleteStepHandler(items.id)}><BsFillTrashFill color='ffffff' /></button>
                                                        </div>
                                                }

                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </Collapse >
            </div >
            
        </>
    )
}
