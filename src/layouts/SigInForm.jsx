import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AdemTextInput from "../utilities/customFormControls/AdemTextInput";
import LoadingButton from "./LoadingButton";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { siteKey } from "../utilities/constants/recaptcha";
import Cookies from 'js-cookie';



export default function SigInForm({ handleOnSubmit }) {
  const [initialValues] = useState({
    email: Cookies.get("email") ? Cookies.get("email") : "",
    password: Cookies.get("password") ? Cookies.get("password") : "",
    remember: Cookies.get("remember") ? Cookies.get("remember") : "",
  });

  const schema = Yup.object({
    email: Yup.string().required("Email alanı zorunludur"),
    password: Yup.string().required("Parola alanı zorunludur"),
  });

  const [capVal, setCapVal] = useState(false);

  const isLoginLoading = useSelector((state) => state.auth.isLoginLoading);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        handleOnSubmit(values);
        resetForm();
      }}
    >
      <Form>
        <h2>Giriş Yap</h2>
        <div className="form-group">
          <label className="signin-label" htmlFor="email">
            Email
          </label>
          <AdemTextInput
            name="email"
            type="email"
            className="text-alani"
            id="email"
            placeholder="Email adresi"
          />
        </div>

        <div className="form-group">
          <label className="signin-label" htmlFor="password">
            Parola
          </label>
          <AdemTextInput
            name="password"
            placeholder="Parola"
            id="password"
            type="password"
            className="text-alani"
          />
        </div>
        <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
          <label className="signin-label" htmlFor="remember" style={{marginRight:15}}>
            Beni hatırla
          </label>
          <AdemTextInput     
            className="remember-me"       
            name="remember"
            id="remember"
            type="checkbox"            
          />
        </div>
        <div className="link-unuttum-div">
          <Link to="/sifremi-unuttum" className="link-unuttum">
            Şifremi unuttum
          </Link>
        </div>
        <div className="form-group">
          <ReCAPTCHA sitekey= {siteKey} onChange={(val) => {setCapVal(val)}}/>
        </div>
        {isLoginLoading ? (
          <LoadingButton />
        ) : (
          <button
            type="submit"
            disabled={!capVal}
            className="girisbtn btn btn-secondary"
          >
            Giriş yap
          </button>
        )}

        <p>
          Hesabın yok mu?{" "}
          <Link to="/kayit" className="link">
            Kaydol
          </Link>
        </p>
      </Form>
    </Formik>
  );
}
