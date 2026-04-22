import React from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { memo } from "react";



function Navbar({ productCount }) {
    return (
        <div className=" bg-white py-6 px-16  w-full">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <img className="h-16 object-cover" src="https://cdn.vectorstock.com/i/500p/15/45/minglemart-e-commerce-logo-vector-59481545.jpg" alt="amazon-logo" />
                <Link className="flex flex-col items-center mb-8" to="/CartPage">

                    <CiShoppingCart className="text-5xl text-primary-default" />
                    <span className="-m-9 text-primary-default">{productCount}</span>
                </Link>
            </div>
        </div>
    );
}

export default memo(Navbar);