import React from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { memo } from "react";
import { BiUser } from "react-icons/bi";

function Navbar({ productCount }) {
    return (
        <div className=" bg-white py-6 px-16  w-full">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <img className="h-16 object-cover" src="https://cdn.vectorstock.com/i/500p/15/45/minglemart-e-commerce-logo-vector-59481545.jpg" alt="amazon-logo" />
                <div className="flex items-center gap-4">
                    <Link className="flex flex-col items-center mb-8" to="/CartPage">

                        <CiShoppingCart className="text-5xl text-primary-default" />
                        <span className="-m-9 text-primary-default">{productCount}</span>
                    </Link>
                    <Link to="/Dashboard">
                      <BiUser className='text-3xl mt-5 text-primary-default' />
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default memo(Navbar);