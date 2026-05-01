import React, { useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductlistPage from "./pages/ProductlistPage";
import UserProvider from "./contexts/UserProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProductdetailsPage from "./pages/ProductdetailsPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import DashboardPage from "./pages/DashboardPage";
import UserRoute from "./components/UserRoutes";
import CartProvider from "./contexts/CartProvider";


function App() {
  

  const path = window.location.pathname;

  const location = useLocation();

  const isLoginPage =
    location.pathname === "/LoginPage" ||
    location.pathname === "/SignupPage" ||
    location.pathname === "/ForgotPassPage";


  //<CartPage cart = {cart} updateCart = {setCart} />
  return (
    <UserProvider>
      <CartProvider>

      <div className="  min-h-screen overflow-scroll flex flex-col">
         {!isLoginPage && <Navbar/>}
        <div className="grow px-4 bg-gray-light">
          <Routes>
            <Route index element={<ProductlistPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
            <Route path="/ForgotPassPage" element={<ForgotPassPage />} />
            <Route path="/CartPage" element={<CartPage/>} />
            <Route path="/Products/:id" element={<ProductdetailsPage/>} />
            <Route
              path="/dashboard"
              element={
                <UserRoute>
                  <DashboardPage />
                </UserRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div>
          {!isLoginPage &&  <Footer />}
        </div>
      </div>
      </CartProvider>
    </UserProvider>


  );
  // path="*" means -> when no routes matches then this route run

}

export default App;
