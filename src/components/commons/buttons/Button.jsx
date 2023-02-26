import React from "react";


function Button({classButton,functionClick,text}){
    return(
        <button
        className={classButton}
        onClick={functionClick}>
            {text}
        </button>
    );
}

export default Button;