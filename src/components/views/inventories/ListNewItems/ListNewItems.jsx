
var product = [
    {
        "raw_material_id": 1,
        "stock": 400,
        "price": 56
    },
    {
        "raw_material_id": 2,
        "stock": 400,
        "price": 56
    },
    {
        "raw_material_id": 3,
        "stock": 400,
        "price": 56
    },
    {
        "raw_material_id": 4,
        "stock": 400,
        "price": 56
    },
    {
        "raw_material_id": 5,
        "stock": 400,
        "price": 56
    },
    {
        "raw_material_id": 6,
        "stock": 400,
        "price": 56
    }
]


function ListNewItems() {
    return (
        <div className="p-5 bg-lime-500 dark:text-white">
            <table className="w-full">
                <thead className='border-4 border-transparent'>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio total</th>
                        <th>Acciones</th>
                    </tr>
                </thead >
                <tbody className="max-h-60 overflow-auto">
                    {
                        product.map((product) => (
                            // console.log(product.raw_material_id)
                            <tr className="bg-blue-400">
                                <th>COSA</th>
                                <th>{product.stock}</th>
                                <th>{product.price}</th>
                                <th>{product.raw_material_id}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </div>
    )
}

export default ListNewItems
