import React, {useContext} from "react";
import { withFormik } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import Button from "../components/Button";
import { addUser } from "../api";
import { UserContext } from "../contexts/UserContext";

function callSignupApi(values, {setSubmitting, props }) {
   const navigate = props.navigate;
  const login = props.login;
  console.log("login wala",login);
     console.log("sigup api name2 calling",values.fullName);

  addUser(values.fullName.split(" ")[0], values.myEmail, values.myPassword)
    .then(({ user, token }) => {
      login(user, token);
      console.log("token ml gya",token )
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message || "Signup failed";
      alert(errorMessage);
    })
    .finally(() => {
      setSubmitting(false);
    });
}
const schema = Yup.object().shape({
    fullName: Yup.string().required(),
    myEmail: Yup.string().email().required(),
    myPassword: Yup.string().min(8).max(12).required(),
    confermPass: Yup.string().min(8).max(12).required(),
});

const initialValues = {
    fullName: "",
    myEmail: "",
    myPassword: "",
    confermPass: "",
};

export function SignupPage({ handleSubmit, errors, touched, values, handleChange, handleBlur, isSubmitting }) {
    ;

    return (
        <div className=" flex flex-col h-full justify-center items-center bg-white max-w-6xl mx-auto my-12 py-6 px-6" >
            <div className="text-8xl text-gray-900 pb-4">
                <CiShoppingCart />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col justify-between w-90 px-6 py-2 rounded-md shadow-md bg-white space-y-3 ">
                <div className="text-2xl mb-8 text-primary-default font-serif font-bold">
                    DOWN-TOWN CityCart
                </div>
                <Input
                    values={values.fullName}
                    error={errors.fullName}
                    touched={touched.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="enter fullName"
                    id="Full-Name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="user-FullName"
                    placeholder="FullName"
                />

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
                    placeholder="Email"
                />


                <Input
                    values={values.myPassword}
                    error={errors.myPassword}
                    touched={touched.myPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="enter Password"
                    id="user-password"
                    name="myPassword"
                    type="password"
                    required
                    autoComplete="my-Password"
                    placeholder="enter Password"
                />

                <Input
                    values={values.confermPass}
                    error={errors.confermPass}
                    touched={touched.confermPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="conferm Password"
                    id="cnfm-password"
                    name="confermPass"
                    type="password"
                    required
                    autoComplete="conferm-Password"
                    placeholder="conferm Password"
                />

                <div className="self-center space-x-2">
                    <Button
                        type="button"
                        disabled={!dirty}
                        className=" disabled:bg-primary-light px-3 py-0.5 rounded-sm self-end">
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className=" disabled:bg-primary-light px-2 py-0.5 rounded-sm ">
                        Signup
                    </Button>
                </div>

                <div className="self-center text-sm mt-2 text-gray-400 "> Already have an account?
                    <Link to="/" className="text-primary-default"> Login </Link>
                </div>
            </form>
        </div>
    );


}

const OptimizedSignupPage = withFormik({
    mapPropsToValues: () => initialValues,
    validationSchema: schema, 
    handleSubmit: callSignupApi,
    validateOnMount: true,
})(SignupPage);

export default function SignupPageWithNavigate() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  return <OptimizedSignupPage navigate={navigate} login={login} />;
}