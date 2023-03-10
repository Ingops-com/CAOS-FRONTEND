import React from "react";
import './Cards.css'

function Cards({titleCard, bodyCard, cardNum}){
    return(
    <div className="w-80 h-32 p-2 rounded bg-emerald-500 shadow-xl dark:shadow-none bg-gradient-to-r text-white text-base" id={cardNum}>
        <div className="titleCard">
            <h1>{titleCard}</h1>
        </div>
        <div className="bodyCard">
            <p className="text-3xl">{bodyCard}</p>
        </div>
    </div>
    )
}

export default Cards