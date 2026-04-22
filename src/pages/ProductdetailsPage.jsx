import React, { useEffect, useState, useMemo , useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import { getProductData } from '../api';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import Button from '../components/Button';

function ProductdetailsPage({onAddToCart}) {
    const id = +(useParams().id);
    const [count, setCount] = useState(1)
    const [Product, setProduct] = useState()
    const [Loadings, setLoadings] = useState(true)


    useEffect(function () {
        const P = getProductData(id);
        P.then(function (product) {  //yaha prticular id ka product ayega
            setProduct(product) //aur yaha wo product ko set kar denge 
            setLoadings(false)
        });
        P.catch(function(error){
             setLoadings(false)
        });
        
        setCount(1)
    }, [id]);

    const HandleCountChange = useCallback(function(event) {
        const newNum = +event.target.value;  // value ko int (+) krna complsry h 
        setCount(newNum)
     }, []);

    const HandleAddToCart = useCallback(function (){
        onAddToCart(id, count)
    }, [id,count]);

    if (Loadings) {
        return <Loading /> ;
    }

    if (!Product) {
        return <NotFound/> ;
    }

    return (
        <div class=" max-w-6xl mx-auto">

            <Link to="/" className=" flex items-center my-4">
                <FaArrowLeft /> HomePage
            </Link>

            <div className="bg-white lg:flex lg:gap-6 space-y-4 my-4 p-6">
                <div className=" h-full lg:w-[40%]">
                    <img class="max-h-full  lg:w-full lg:shrink-0 bg-gray-light"
                        src={Product.thumbnail} />
                </div>

                <div class=" space-y-3 lg:space-y-4 lg:my-10 lg:w-[60%] ">
                    <div class="text-3xl font-mono lg:text-3xl text-cyan-900">{Product.title}</div>
                    <div class=" text-xl lg:text-xl text-cyan-900 font-bold "> RS: {Product.price}</div>
                    <div class=" text-lg lg:text-lg text-cyan-900 font-serif">{Product.description}
                    </div>
                    <div>
                       
                        <input class="w-12 pl-2 border-2 border-black rounded-sm"
                        type="number"
                        value = {count}
                        onChange = {HandleCountChange}>
                        </input>

                        <Button onClick={HandleAddToCart}>
                            ADD TO CART
                        </Button>

                        

                    </div>
                </div>
            </div>

            <div className="flex justify-between mx-auto items-center">

                <div>
                    {id > 1 &&
                        <Link to={"/Products/" + (id - 1)} className=" flex items-center my-2">
                            <FaArrowLeft /> Previous
                        </Link>}
                </div>
                <div>
                    <Link to={"/Products/" + (id + 1)} className="flex items-center"> Next
                        <FaArrowRight />
                    </Link>
                </div>
            </div>

        </div>)

}

export default ProductdetailsPage;