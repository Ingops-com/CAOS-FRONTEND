import React, { useEffect } from 'react';
import Cards from '../../commons/cards/Cards.jsx'
import services from '../../../services/inventoriesServices.jsx'


function Inventories() {
    useEffect(() => {
        let key = localStorage.getItem('key')
        services(key.replace(/['"]+/g, '')).then((res) => {
            var data = JSON.stringify(res.data)
            console.log(data)
        })
    }, [])
    return (
        <div className='inventoriesBody'>
            <div className='cardsContainer'>
            </div>
        </div>
    )
}

export default Inventories