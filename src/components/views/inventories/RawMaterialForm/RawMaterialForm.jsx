import { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../../../context/CategoriesContext'
import { InventoriesContext } from '../../../../context/InventoriesContext'
import { RawMateContext } from '../../../../context/RawMateContext'
import { UnitMeasuresContext } from '../../../../context/UnitMeasuresContext'

function RawMaterialForm() {

    const { getAllCategories, dataCategories } = useContext(CategoriesContext)
    const { getAllUnitMeasure, dataUnitMeasure } = useContext(UnitMeasuresContext)
    const { createRawMaterial, newRawMate, dataIdRawMaterial, getIdRawMaterial } = useContext(RawMateContext)
    const { createItemInventorie } = useContext(InventoriesContext)

    useEffect(() => {
        getAllCategories()
        getAllUnitMeasure()
    }, [])

    useEffect(() => {
        if (newRawMate != '') {
            getIdRawMaterial(newRawMate)
        }
    }, [newRawMate])

    useEffect(() => {
        if (dataIdRawMaterial != []) {
            createItemInventorie(dataIdRawMaterial)
        }
    }, [dataIdRawMaterial])

    function handleSubmit(e) {
        e.preventDefault()
        let name = e.target.name.value
        let categorie = e.target.categories.value
        let unitMeasure = e.target.unitMeasure.value
        createRawMaterial(name, categorie, unitMeasure)
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

export default RawMaterialForm