import React, { useEffect, useState } from "react";
import { getProductData } from "../api";
import CartList from "../components/CartList";
import Loading from "../components/Loading";

function CartPage({cart, updateCart}) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(function () {
        const productIds = Object.keys(cart);
        const myProductPromises = productIds.map(function (id) {
            return getProductData(id);
        });  //only promises store here

        Promise.all(myProductPromises).then(function (product) {
            setProducts(product);
            setLoading(false);
        });   //when all promises are come, then store them
    }, [cart]);


    if (loading) {
        return <Loading />;
    }

    return (
        <div className ="max-w-6xl mx-auto bg-white my-16  p-10">
            <CartList products = {products} cart={cart} updateCart={updateCart} setLoading={setLoading}/>
         
        </div>

    )

}

export default CartPage;