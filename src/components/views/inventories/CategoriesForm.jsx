import { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../../context/CategoriesContext'

function CategoriesForm() {

    const { getAllCategories, dataCategories, dataUnitMeasure, getAllUnitMeasure, createRawMaterial, getIdRawMaterial, dataIdRawMaterial, createItemInventorie } = useContext(CategoriesContext)

    useEffect(() => {
        getAllCategories()
        getAllUnitMeasure()
    }, [])


    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target.name.value
        let categorie = e.target.categories.value
        let unitMeasure = e.target.unitMeasure.value
        createRawMaterial(name, categorie, unitMeasure)
        getIdRawMaterial(name)
        createItemInventorie(dataIdRawMaterial.id)
        //window.location.reload()
    }

    return (
        <div className='containerCategories'>
            <form onSubmit={handleSubmit}>
                <select id="categories">
                    {dataCategories.map((categorie, index) => (
                        <option key={index} value={categorie.id}>{categorie.name}</option>
                    ))}
                </select>
                <input type="text" id="name" className='' placeholder='Nombre de la materia prima' required />
                <select name='unitMeasure'>
                    {dataUnitMeasure.map((unitMeasure, index) => (
                        <option key={index} value={unitMeasure.id}>{unitMeasure.name}</option>
                    ))}
                </select>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default CategoriesForm