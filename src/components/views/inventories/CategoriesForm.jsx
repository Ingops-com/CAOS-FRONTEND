import { useContext, useEffect } from 'react'
import { CategoriesContext } from '../../../context/CategoriesContext'

function CategoriesForm() {

    const { getAllCategories, categories } = useContext(CategoriesContext)

    useEffect(()=>{
        getAllCategories()
    },[])
    return (
        <div className='containerCategories'>
            <select name="categories">
                {categories.map((categorie, index) => (
                    <option key={index} value={categorie.id}>{categorie.name}</option>
                ))}
            </select>
        </div>
    )
}

export default CategoriesForm