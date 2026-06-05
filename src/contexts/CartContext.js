import { createContext, useContext } from "react";

export const CartContext = createContext(undefined);


export const useCartProvider = () => {
    const context = useContext(CartContext);
  return context;
}