import React, { useMemo } from "react";
import Button from "./Button";

function CartTotal({ products, cart }) {

    const totalArr = useMemo(() => {
        return products.map((p) =>
            (p.price * cart[p.id]) // it return (price x quantity)
        )
    }, [products, cart]);

    const subTotal = useMemo(() => {
        let Total = 0;
        for (let i = 0; i < totalArr.length; i++) {
            Total += totalArr[i];
        }
        return Total;
    }, [totalArr]);



    return (
        <div className="flex justify-end " >
            <div className=" mt-3 border border-gray-200  w-80 flex flex-col">
                <h3 className="p-2 border-b border-gray-200 text-xl font-serif font-semibold text-slate-700">CartTotals</h3>
                <div className="flex justify-around p-2 mt-3 border-b border-gray-200">
                    <h2 className=" font-semibold text-slate-700">SubTotals</h2>
                    <h1 className="font-semibold text-slate-700">${subTotal}</h1>
                </div>
                <Button className="p-2 my-4 mx-1 rounded-lg grow font-semibold ">Proceed to checkout</Button>

            </div>
        </div>
    );
}
export default CartTotal;