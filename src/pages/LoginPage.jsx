import React, {useContext} from "react";
import axios from "axios";
import { withFormik } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { UserContext } from "../contexts/UserContext";
import Button from "../components/Button";

function callLoginApi(values, {setSubmitting, props}) {
     const navigate = props.navigate;
  const login = props.login;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsNzg2QGdtYWlsLmNvbSIsImlkIjoiMDE5ZGI1N2QtNzRmNC03MjJjLTg0OTItOTEyZDg5M2U2MzI1IiwiaWF0IjoxNzc2ODY2MzkxLCJleHAiOjE3Nzc0NzExOTF9.4PgqPyxiSBo8LjxhLUOuEgeY7O6ikZSLi3pP-GgaViU";

  login(null, token);
  navigate("/dashboard");
  setSubmitting(false);
  console.log("setsub check", setSubmitting)
}
    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        myPassword: Yup.string().min(8).max(12).required(),
    });

    const initialValues = {
        email: "",
        myPassword: "",
    };

export function LoginPage({handleSubmit, errors, touched, values, handleChange, handleBlur,isValid,isSubmitting,dirty,}) {
  
    
    return (
        <div className=" flex flex-col h-full justify-center items-center bg-white max-w-6xl mx-auto my-15 py-12 px-6 shadow-sm" >
            <div className="text-9xl text-gray-900 pb-4">
                <CiShoppingCart />
            </div>
         
                <form onSubmit={handleSubmit} className="flex flex-col justify-between w-90 px-6 py-2 rounded-md shadow-md bg-white space-y-0.5 ">
                    <div className="text-2xl mb-8 text-primary-default font-serif font-bold">
                        DOWN-TOWN CityCart
                    </div>
                    <Input
                        values = {values.email}
                        error = {errors.email}
                        touched = {touched.email}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        label="enter email "
                        id="userName"
                        name="email"
                        type="text"
                        required
                        autoComplete="email"
                        placeholder="email"
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
                        <Button
                            type="button"
                            disabled={!dirty}
                            className="disabled:bg-primary-light px-2 py-0.5 rounded-sm self-end">
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className=" disabled:bg-primary-light px-2 py-0.5 rounded-sm ">
                            Login
                        </Button>
                    </div>

                    <div className="self-center text-sm mt-2 text-gray-400 "> don't have an account?
                        <Link to="/signupPage" className="text-primary-default underline hover:text-primary-dark"> Signup </Link>
                    </div>
                </form>
        </div>
    );
}

const OptimizedLoginPage = withFormik({
    mapPropsToValues: () => initialValues,
    validationSchema: schema, 
    handleSubmit: callLoginApi,
    validateOnMount: true,
})(LoginPage);

export default function LoginPageWithNavigate() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  return <OptimizedLoginPage navigate={navigate} login={login} />;
}