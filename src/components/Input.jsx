import React from "react";


function Input({ name, label, id, classname, touched, error, ...rest }) {

    let borderClass = "border-gray-300 focus:border-indigo-500 ";

    if (error && touched) {
        borderClass = "border-red-500 "; // must give space before (") 
    }


    return (

        <div>
            <label htmlFor={id} className="sr-only ">
                {label}
            </label>
            <input
                id={id}
                name={name}
                className={
                    " relative block w-full appearance-none rounded-md rounded-t-md px-3 py-1 border border-gray-400 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm " + classname + + borderClass
                }
                {...rest}
            />
            {touched && error && (
                <div className="text-red-700">{error}</div>
            )}
        </div>
    );
}
export default Input;