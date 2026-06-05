import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CartContext } from "./CartContext.js";
import { getProductData } from "../api";
import { getCart, saveCart } from "../api";
import { useUserProvider } from "./UserContext.js";



const CartProvider = ({ children }) => {

    const { isLoggedin, token } = useUserProvider()

    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedin) {
            getCart(token).then((data) => {
                setCart(data.cart || {});
            })
                .catch(() => {
                    setCart({});
                });
        } else {
            const saved = localStorage.getItem("my-Cart");
            setCart(JSON.parse(saved) || {});

        }
    }, [isLoggedin])


    useEffect(() => {
        const filteredCart = Object.fromEntries(Object.entries(cart) //converted object into array then filtered and again converted into object
            .filter(([key, value]) => value !== 0)
        );
        const productIds = Object.keys(filteredCart);
        const myProductPromises = productIds.map((id) => {
            return getProductData(id);
        });  //only promises store here

        Promise.all(myProductPromises).then(function (product) {
            setProducts(product || []);
            setLoading(false);
        });   //when all promises are come, then store them
    }, [cart]);



    const HandleAddToCart = useCallback((productId, Count) => {
        const oldCount = cart[productId] || 0;

        const newCart = { ...cart, [productId]: oldCount + Count }
        updateCart(newCart);
    }, [cart, token])

    const removeProduct = useCallback((id) => {
        setCart((prev) => {
            let updatedCart = { ...prev, [id]: 0 };
            if (isLoggedin) {
                saveCart(updatedCart, token);
                localStorage.removeItem("my-Cart");

            } else {
                localStorage.setItem("my-Cart", JSON.stringify(updatedCart));
            }
            setLoading(true);
            return updatedCart || {};

        })

        // delete newCart[id];
        // setLoading(true);
    }, [cart, token]);


    function updateCart(newCart) {
        const updatedCart = { ...newCart }
        if (isLoggedin) {
            saveCart(updatedCart, token);
        } else {
            localStorage.setItem("my-Cart", JSON.stringify(newCart));
        }
        setCart(newCart || {});

    }



    const totalCount = useMemo(() =>
        +Object.keys(cart).reduce((previous, current) => {
            return +previous + cart[current];
        }, 0), [cart]);  // pre me initital o rhega and curr me obj.key1... ayega and then return me cart[cur] se key ka value milega
    //  or add ho jyega or pre me jata rhega or jab sab obj trace ho jyega then totcount me final additin ayga



    return <CartContext.Provider value={{ cart, HandleAddToCart, removeProduct, updateCart, totalCount, products, loading, setLoading }}>
        {children}
    </CartContext.Provider>
}

export default CartProvider;
