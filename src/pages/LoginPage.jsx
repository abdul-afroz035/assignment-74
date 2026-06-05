import React from "react";
import axios from "axios";
import { withFormik } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import Button from "../components/Button";
import { signInUser } from "../api";
import { useUserProvider } from "../contexts/UserContext";

function callLoginApi(values, { setSubmitting, props }) {
    const navigate = props.navigate;
    const login = props.login;

    signInUser(values.email, values.password)
        .then((response) => {
            const { user, token } = response;

            if (user && token) {
                login?.(user, token);
                navigate("/dashboard");
            }
        })
        .catch((error) => {
            const errorMessage = error.message || "Login Failed"
        })
        .finally(() => {
            setSubmitting(false);
        });
}

const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8)
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[^a-zA-Z0-9]/,"Password must contain at least one special character")
      .matches(/[0-9]/, "Password must contain at least one number"),
});

const initialValues = {
    email: "",
    password: "",
};

export function LoginPage({ handleSubmit, errors, touched, values, handleChange, handleBlur, isValid, isSubmitting, dirty, }) {


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
                    values={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    values={values.password}
                    error={errors.password}
                    touched={touched.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="enter Password"
                    id="user-password"
                    name="password"
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
                    <Link to="/SignupPage" className="text-primary-default underline hover:text-primary-dark"> Signup </Link>
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
    const { login } = useUserProvider();
    return <OptimizedLoginPage navigate={navigate} login={login} />;
}