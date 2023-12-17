import { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InventoriesContext } from '../../../../context/Inventories/InventoriesContext';
import { RecipesIngrContext } from '../../../../context/Production/recipes/ingredients/RecipesIngrContext';
import { MultiSelect } from 'primereact/multiselect';

function IngredientsForm({ showFormIngredients, setBottonsIngr, id_recipe }) {
    const [selectedCities, setSelectedCities] = useState(null);

    const { data, getAllInvRawMate } = useContext(InventoriesContext)
    const { createIngr } = useContext(RecipesIngrContext)

    const nodeRef = useRef(null);

    useEffect(() => {
        getAllInvRawMate()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)

        selectedCities.map(item => {
            createIngr(id_recipe, item.raw_material.name, 0)
        })
        
    }

    return (
        <CSSTransition nodeRef={nodeRef} in={showFormIngredients} timeout={200} classNames="" unmountOnExit appear={true}
            onEnter={() => { }}
        >
            <div id='formNew' ref={nodeRef} className='flex justify-center items-center m-5'>
                <div className='w-fit  dark:shadow-none bg-white dark:bg-dark-ing-800'>
                    <form onSubmit={handleSubmit} className="flex gap-3 justify-center items-center" >
                        <div className="relative">
                            <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={data} optionLabel="raw_material.name"
                                filter placeholder="Ingredientes" maxSelectedLabels={3} className="w-full md:w-20rem " />
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