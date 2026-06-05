import React, { useCallback } from "react";
import CartRow from "./CartRow";
import Button from "./Button";
import { useState, useEffect } from "react";
import CartTotal from "./CartTotal";
import { useCartProvider } from "../contexts/CartContext";

function CartList() {

    const { cart, updateCart, products, setLoading } = useCartProvider();
    
    const [localCart, setLocalCart] = useState(cart);

    useEffect(function () {
        setLocalCart(cart)
    }, [cart]);

    const handleQuantityChange = useCallback((event, id) => {
        const newValue = event;
        const productId = id;

        const newLocalcart = { ...localCart, [productId]: newValue };
        setLocalCart(newLocalcart);
    }, [localCart]);


    const updateMyCart = useCallback(() => {
        updateCart(localCart);
    }, [localCart]);


    return (
        <div>
            <div className="  border border-gray-100 shadow-xl ">
                <div className="flex m-0.5 p-3 border-b border-gray-100">
                    <span className=" grow ml-36 font-semibold text-slate-700">Product</span>
                    <span className="w-20 mx-15 font-semibold text-slate-700">Price</span>
                    <span className="w-25 font-semibold text-slate-700">Quantity</span>
                    <span className="w-20 font-semibold text-slate-700">Subtotal</span>
                </div>
                <div>
                    {products.map(function (p) {
                        return (
                            <CartRow key={p.id} product={p} quantity={localCart[p.id]} onQuantityChange={handleQuantityChange} />
                        )
                    })}
                </div>
                <div className="flex m-0.5 justify-end px-4 py-2">
                    <Button onClick={updateMyCart} className="">updatee cart</Button>
                </div>
            </div>

            <CartTotal products={products} cart={cart} />



        </div>

    );
}

export default CartList;