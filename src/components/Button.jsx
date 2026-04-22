import React,{ memo } from "react";
import { twMerge } from "tailwind-merge";

function Button({ classname, ...rest}) {
    
    return (

        <button
            {...rest}
            className={twMerge("text-sm py-1 px-3 ml-1 border bg-primary-default hover:bg-primary-dark text-white rounded-lg", classname)}
           
        ></button>
    );
}

export default memo(Button); 