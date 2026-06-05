import React, { useEffect, useState, useContext } from "react";
import CartList from "../components/CartList";
import Loading from "../components/Loading";
import { useCartProvider } from "../contexts/CartContext";

function CartPage() {
        const {loading} = useCartProvider();


 



    if (loading) {
        return <Loading />;
    }

    return (
        <div className ="max-w-6xl mx-auto bg-white my-16  p-10">
            <CartList/>
         
        </div>

    )

}

export default CartPage;