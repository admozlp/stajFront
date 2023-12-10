import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/css/SignIn.css";
import AdemTextInput from "../../utilities/customFormControls/AdemTextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";
import LoadingButton from "../../layouts/LoadingButton";

export default function SignUp() {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const schema = Yup.object({
    firstname: Yup.string()
      .required("Ad alanı zorunludur")
      .max(50, "Ad maksimum 50 karakter olabilir"),
    lastname: Yup.string()
      .required("Soyad alanı zorunludur")
      .max(50, "Soyadm maksimum 50 karakter olabilir"),
    email: Yup.string()
      .required("Email alanı zorunludur")
      .email("Email geçerli değil")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email geçerli değil"),
    password: Yup.string()
      .required("Parola alanı zorunludur")
      .min(8, "Parola minimum 8 karakter olabilir")
      .max(150, "Parola maksimum 150 karakter olabilir")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,         
        "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"        
      ),
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.isLoading);

  const registerError = useSelector((state)=> state.auth.registerError);

  const navigate = useNavigate();

  function handleOnSubmit(values) {
    dispatch(addUser(values)).then((response) => {
      if (addUser.fulfilled.match(response) && response.payload.status === 200) {
        localStorage.clear();
        localStorage.setItem("user-token", response.payload.data.access_token)        
        navigate("/")
      }    
    });
  }
  
  return (
    <div className="signin-container">
      <h2>Sign Up</h2>
      {
        registerError ?
        ( 
          <div className="alert alert-danger"> 
            {registerError}
          </div>
         ) : (null)
      }

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
         // resetForm();
          handleOnSubmit(values);
        }}>
        <Form>
          <div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <AdemTextInput
                name="firstname"
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter First Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <AdemTextInput
                name="lastname"
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <AdemTextInput
                name="email"
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <AdemTextInput
                name="password"
                placeholder="Enter password"
                id="password"
                type="password"
                className="form-control"
              />
            </div>
            {
            isLoading ? (
              <LoadingButton />
            ) : (
              <button type="submit" className="btn btn-primary">Sign Up</button>
            )}
          </div>
        </Form>
      </Formik>
      <p>Do you have an account? <Link to="/signin">SignIn </Link></p>
    </div>
  );
}
