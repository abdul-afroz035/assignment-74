import React, {useState, useMemo} from "react";
import { CartContext } from "./CartContext.js";


 const CartProvider = ({ children }) => {

    const saveCartItem = localStorage.getItem("my-Cart") || "{}";
    const savedCart = JSON.parse(saveCartItem);

    const [cart, setCart] = useState(savedCart)  //empty object dia initialy

    function HandleAddToCart(productId, Count) {   //balti pas krege prdctDet Tag se
        const oldCount = cart[productId] || 0;  //agar cart ke andr current prId hoga to uska count store krega 

        const newCart = { ...cart, [productId]: oldCount + Count }
        updateCart(newCart);
    }

    function updateCart(newCart) {
        setCart(newCart);
        const cartString = JSON.stringify(newCart);
        localStorage.setItem("my-Cart", cartString);
    }


    const totalCount = useMemo(() =>
        +Object.keys(cart).reduce((previous, current) => {
            return +previous + cart[current];
        }, 0), [cart]);  // pre me initital o rhega and curr me obj.key1... ayega and then return me cart[cur] se key ka value milega
    //  or add ho jyega or pre me jata rhega or jab sab obj trace ho jyega then totcount me final additin ayga


     
return  <CartContext.Provider value={{ cart, HandleAddToCart, updateCart, totalCount }}>
        { children }
    </CartContext.Provider> 
}

export default CartProvider;
