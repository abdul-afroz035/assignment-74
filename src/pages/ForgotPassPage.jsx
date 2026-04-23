import React from "react";
import { withFormik } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

function callForgotApi() {
    const { navigate } = props;
    alert(`Password reset link sent to ${values.email}`);
    navigate("/login");
    setSubmitting(false);
}
const schema = Yup.object().shape({
    myEmail: Yup.string().email().required(),
});

const initialValues = {
    myEmail: "",
};

export function ForgotPassPage({ handleSubmit, errors, touched, values, handleChange, handleBlur }) {

    return (
        <div className=" flex flex-col h-full justify-center items-center bg-white max-w-6xl mx-auto mt-14 py-12 px-6" >
            <div className="text-9xl text-gray-900 pb-4">
                <CiShoppingCart />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-between w-90 px-6 py-2 rounded-md shadow-md bg-white space-y-4 ">
                <div className="text-2xl mb-8 text-primary-default font-serif font-bold">
                    DOWN-TOWN CityCart
                </div>
                <Input
                    values={values.myEmail}
                    error={errors.myEmail}
                    touched={touched.myEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="enter email"
                    id="user-email"
                    name="myEmail"
                    type="email"
                    required
                    autoComplete="email-address"
                    placeholder="enter Email address"
                />

                <button
                    type="button"
                    className="text-white bg-primary-default hover:bg-primary-dark
                                     disabled:bg-primary-light px-2 py-0.5 rounded-sm  ">
                    request reset link
                </button>
                <Link to="/"
                    className="self-center text-sm  text-primary-default hover:text-primary-dark"> Back to Login
                </Link>
            </form>
        </div>
    );
}
const OptimizedForgotPassPage = withFormik({
    mapPropsToValues: () => initialValues,
    validationSchema: schema,
    handleSubmit: callForgotApi,
    validateOnMount: true,
})(ForgotPassPage);

export default function ForgotPassPageWithNavigate() {
    const navigate = useNavigate();
    return <OptimizedForgotPassPage navigate={navigate} />;
}