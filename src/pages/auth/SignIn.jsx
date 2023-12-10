import React from "react";
import { Link } from "react-router-dom";
import "../../style/css/SignIn.css";
import AdemTextInput from "../../utilities/customFormControls/AdemTextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from "../../layouts/LoadingButton";
import { useNavigate } from "react-router-dom"


export default function SignIn() {
  const initialValues = { email: "", password: "" };

  const schema = Yup.object({
    email: Yup.string().required("Email field is required").email("Invalid email").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email"),
    password: Yup.string().required("Password field is required").max(15, "Max 15 charaters")
  });

  const dispatch = useDispatch();

  const isLoading = useSelector((state)=> state.auth.isLoading);

  const loginError = useSelector((state) => state.auth.loginError);

  const logoutSuccess = useSelector((state) => state.auth.logoutSuccess);

  const navigate = useNavigate();

  function handleOnSubmit(values) {
    dispatch(login(values)).then((response) => {
      if (login.fulfilled.match(response) && response.payload.status === 200) {
        localStorage.clear();
        localStorage.setItem("user-token", response.payload.data.access_token)
        navigate("/")
      }
    });
  }

  return (
    <div className="signin-container">
          {
            loginError ?
            ( 
              toast.error(`${loginError}`, {
                position: toast.POSITION.TOP_LEFT,
                toastId:""
              })
            ) : logoutSuccess ? 
            (
              toast.success(`Başarıyla çıkış yapıldı`, {
                position: toast.POSITION.TOP_LEFT,
                toastId:""
              })
            ) : (null)
          }

          <h2>Sign In</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
              handleOnSubmit(values);
              resetForm();
            }}>
    
            <Form>
              <div>
                <ToastContainer />
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
          
                    <button type="submit" className="btn btn-primary">Sign in</button>
                )}
              </div>
            </Form>
          </Formik>
          <p>Don't you have an account? <Link to="/signup">SignUp</Link></p>                
    </div>
  );
}
