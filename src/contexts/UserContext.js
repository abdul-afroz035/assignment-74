import React, { createContext, useContext } from "react";



export const UserContext = createContext();


export const useUserProvider = () => {
   const context = useContext(UserContext);
    return context;
}