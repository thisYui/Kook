import React from "react";

export default function Button({
    name, //Button name
    type, //Button type
    onClick, //Onclick event
    className, //Button's className
}) {

    return (
        <button type={type} onclick={onClick} className={className} >
            {name}
        </button>
    );
}