import { useContext, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InventoriesContext } from '../../../../context/Inventories/InventoriesContext';
import { RecipesIngrContext } from '../../../../context/Production/recipes/ingredients/RecipesIngrContext';

function IngredientsForm({ showFormIngredients, setBottonsIngr, id_recipe }) {

    const { data, getAllInvRawMate } = useContext(InventoriesContext)
    const { createIngr } = useContext(RecipesIngrContext)

    const nodeRef = useRef(null);

    useEffect(() => {
        getAllInvRawMate()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        let raw_material_name = e.target.raw_material_name.value
        let percent = e.target.percent.value
        createIngr(id_recipe, raw_material_name, percent)
    }

    return (
        <CSSTransition nodeRef={nodeRef} in={showFormIngredients} timeout={200} classNames="" unmountOnExit appear={true}
            onEnter={() => { }}
        >
            <div id='formNew' ref={nodeRef} className='flex justify-center items-center m-5'>
                <div className='w-fit  dark:shadow-none bg-white dark:bg-dark-ing-800'>
                    <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center" >
                        <div className="relative">
                            <select
                                className="p-2 font-normal rounded-[7px] border border-blue-gray-200 bg-transparent transition-all"
                                id='raw_material_name'
                            >
                                {
                                    data.map((item, index) => (
                                        <option key={index} className="dark:bg-dark-ing-900" value={item.raw_material.name}>{item.raw_material.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                id='percent'

                                required
                            />
                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Porcentaje
                            </label>
                        </div>

                        <button
                            className="middle none center  rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-dark="true"
                        >
                            Agregar
                        </button>

                        <button
                            className="middle none center  rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-dark="true"
                            onClick={(e) => { e.preventDefault(), setBottonsIngr(true) }}
                        >
                            CANCELAR
                        </button>

                    </form>
                </div>
            </div>
        </CSSTransition>
    )
}

export default IngredientsForm