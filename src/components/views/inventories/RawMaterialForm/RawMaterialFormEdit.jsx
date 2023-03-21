import { useContext } from "react"
import { RawMateContext } from "../../../../context/RawMateContext"


function EditForm({ props }) {

    const {editData} = useContext(RawMateContext)

    return (

        <div className="conteinerEdit bg-emerald-500">
            {console.log(editData   )}
            <form onSubmit={console.log(props)}>
                <input type="text" name="quantity" id="quantity" />
                <input type="text" name="price" id="price" />
                <button type="submit">enviar</button>
            </form>

        </div>)
}

export default EditForm