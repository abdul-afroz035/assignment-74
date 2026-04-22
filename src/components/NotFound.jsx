import React from "react";
import { Link } from "react-router";
import { memo } from "react";

function NotFound() {
    return (
        <div className="bg-white max-w-6xl mx-auto my-10 p-6 flex flex-col items-center">

            <div className=" max-w-xl  ">
                <img className="h-full w-full" src="https://miro.medium.com/v2/resize:fit:1200/1*7KCpGW9_D2rIlNV2JhFspQ.png" />
            </div>

            <h1 className="text-3xl font-mono text-yellow-400 my-6">
                page not found
            </h1>

            <Link to="/" className="text-white bg-primary-default py-1 px-3 rounded-lg hover:bg-primary-dark"  >
                Back To Home
            </Link>

        </div>
    );

}

export default memo(NotFound);