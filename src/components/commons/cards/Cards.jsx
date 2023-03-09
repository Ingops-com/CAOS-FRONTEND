import React from "react";

function Cards({titleCard, bodyCard}){
    return(
    <div className="p-3 bg-emerald-500 max-w-xs min-w-[80%]">
        <div className="titleCard">
            <h1>{titleCard}</h1>
        </div>
        <div className="bodyCard">
            <p>{bodyCard}</p>
        </div>
    </div>
    )
}

export default Cards