import React from "react";
import { withFormik } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";


function callLoginApi(values) {
        console.log("sending data");
    }
    const schema = Yup.object().shape({
        username: Yup.string().matches(/^[a-zA-Z0-9_]+$/, "username should be alphabates or number or email").min(3).required(),
        myPassword: Yup.string().min(8).max(12).required(),
    });

    const initialValues = {
        username: "",
        myPassword: "",
    };

export function LoginPage({handleSubmit, errors, touched, values, handleChange, handleBlur}) {
  
    
    return (
        <div className=" flex flex-col h-full justify-center items-center bg-white max-w-6xl mx-auto my-16 py-8 px-6" >
            <div className="text-9xl text-gray-900 pb-4">
                <CiShoppingCart />
            </div>
         
                <form onSubmit={handleSubmit} className="flex flex-col justify-between w-90 px-6 py-2 rounded-md shadow-md bg-white space-y-0.5 ">
                    <div className="text-2xl mb-8 text-primary-default font-serif font-bold">
                        DOWN-TOWN CityCart
                    </div>
                    <Input
                        values = {values.username}
                        error = {errors.username}
                        touched = {touched.username}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        label="enter username "
                        id="userName"
                        name="username"
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="username or email"
                        classname="rounded-b-none"
                    />

                    <Input
                        values = {values.myPassword}
                        error = {errors.myPassword}
                        touched = {touched.myPassword}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        label="enter Password"
                        id="user-password"
                        name="myPassword"
                        type="password"
                        required
                        autoComplete="curr-Password"
                        placeholder="Password"
                        classname="rounded-t-none"
                    />


                    <div className="self-end text-xs text-primary-light ">
                        <Link to="/ForgotPassPage"> Forgot Password?
                        </Link>
                    </div>

                    <div className="self-center space-x-2">
                        <button
                            type="button"
                            className="text-white bg-primary-default hover:bg-primary-dark px-2 py-0.5 rounded-sm self-end">
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-primary-default hover:bg-primary-dark disabled:bg-primary-light px-2 py-0.5 rounded-sm ">
                            Login
                        </button>
                    </div>

                    <div className="self-center text-sm mt-2 text-gray-400 "> don't have an account?
                        <Link to="/signupPage" className="text-primary-default"> Signup </Link>
                    </div>
                </form>
        </div>
    );
}

const myHOC = withFormik({
    validationSchema: schema, 
    initialValues: initialValues,
    handleSubmit: callLoginApi
});
const easyLogin = myHOC(LoginPage);

export default easyLogin;