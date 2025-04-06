import React from "react";

type ButtonProps = {
    buttonName : string,
    buttonType : string,
    onClick : () => void 
}

export const Buton = ({onClick, buttonName, buttonType} : ButtonProps) => {
    return(
        <div className="button-component">
            <button className={"button-component__" + buttonType} onClick={onClick}>{buttonName}</button>
        </div>
    )
}