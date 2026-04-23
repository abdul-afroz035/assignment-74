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


function App() {
  const saveCartItem = localStorage.getItem("my-Cart") || "{}";
  const savedCart = JSON.parse(saveCartItem);

  const [cart, setCart] = useState(savedCart)  //empty object dia initialy

  function HandleAddToCart(productId, Count) {   //balti pas krege prdctDet Tag se
    const oldCount = cart[productId] || 0;  //agar cart ke andr current prId hoga to uska count store krega 

    const newCart = { ...cart, [productId]: oldCount + Count }
    updateCart(newCart);
  }

  function updateCart(newCart) {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem("my-Cart", cartString);
  }


  const totalCount = useMemo(() =>
    +Object.keys(cart).reduce((previous, current) => {
    return +previous + cart[current];
    }, 0) , [cart]);  // pre me initital o rhega and curr me obj.key1... ayega and then return me cart[cur] se key ka value milega
  //  or add ho jyega or pre me jata rhega or jab sab obj trace ho jyega then totcount me final additin ayga

  const path = window.location.pathname;

  const location = useLocation();

  const isLoginPage =
    location.pathname === "/LoginPage" ||
    location.pathname === "/SignupPage" ||
    location.pathname === "/ForgotPassPage";


  //<CartPage cart = {cart} updateCart = {setCart} />
  return (
    <UserProvider>

      <div className="  min-h-screen overflow-scroll flex flex-col">
         {!isLoginPage && <Navbar productCount={totalCount} />}
        <div className="grow px-4 bg-gray-light">
          <Routes>
            <Route index element={<ProductlistPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
            <Route path="/ForgotPassPage" element={<ForgotPassPage />} />
            <Route path="/CartPage" element={<CartPage cart={cart} updateCart={updateCart} />} />
            <Route path="/Products/:id" element={<ProductdetailsPage onAddToCart={HandleAddToCart} />} />
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
    </UserProvider>


  );
  // path="*" means -> when no routes matches then this route run

}

export default App;
