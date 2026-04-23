import React from "react";
import { ImSpinner9 } from "react-icons/im";
import { memo } from "react";



function Loading() {
    return (
        <div className="flex h-100  justify-center items-center  ">
            <ImSpinner9 className="text-primary-default text-3xl animate-spin" />
        </div>
    );
}
export default memo(Loading);