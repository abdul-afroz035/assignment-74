import React  from "react";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Navbar from "./components/Navbaar";
import Loading from "./components/Loading";
import NoMatching from "./components/NoMatching";
import NotFound from "./components/NotFound";
import ProductlistPage from "./pages/ProductlistPage";
import CartPage from "./pages/CartPage";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";

function Test(){


    return (
        <div>
        <h1 className= "bg-red-600">hello world</h1>
        <Navbar/>
         <LoginPage/>
        <Footer/>
        </div>
    );
} 

export default Test;