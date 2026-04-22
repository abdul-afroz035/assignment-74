import React from "react";
import { memo } from "react";

function NoMatching() {
    return (
        <>
            <h1 class="text-3xl text-primary-light bg-white p-2 text-center"> No Matching Result Found </h1>
        </>
    );
}

export default memo(NoMatching);