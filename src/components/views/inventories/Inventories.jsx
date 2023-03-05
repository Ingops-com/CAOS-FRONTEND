import React from 'react';
import Cards from '../../commons/cards/Cards.jsx'
import services from '../../../services/inventoriesServices.jsx'


function Inventories() {
    let data = 'esto es la data'
    let key = localStorage.getItem('key')
    function action(e) {
        e.preventDefault()
        services(key.replace(/['"]+/g, '')).then((res) => {
            var data = JSON.stringify(res.data)
            console.log(data)
            return data
        })

    }
    return (
        <div className='inventoriesBody'>
            <div className='cardsContainer'>
                {/* <Cards />
                <Cards />
                <Cards /> */}
            </div>
            <button onClick={action}>boton{data}</button>
        </div>
    )
}

export default Inventories