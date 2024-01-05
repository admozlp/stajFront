import { Form, Formik } from "formik";
import React, { useState } from "react";
import AdemTextInput from "../utilities/customFormControls/AdemTextInput";
import ReCAPTCHA from "react-google-recaptcha";
import { siteKey } from "../utilities/constants/recaptcha";
import LoadingButton from "./LoadingButton";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";

export default function SignupForm({ handleOnSubmit }) {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const schema = Yup.object({
    firstname: Yup.string()
      .required("Ad alanı zorunludur")
      .min(2)
      .max(100, "Ad maksimum 100 karakter olabilir"),
    lastname: Yup.string()
      .required("Soyad alanı zorunludur")
      .min(2)
      .max(100, "Soyad maksimum 100 karakter olabilir"),
    email: Yup.string()
      .required("Email alanı zorunludur")
      .email("Geçerli bir e-posta adresi girin")
      .min(10, "Email adresi minimum 5 karakter olabilir")
      .max(200, "Email adresi 200 karakter olabilir")
      .matches(
        /^[a-zA-Z0-9._%+-]+@ogr\.ahievran\.edu\.tr$/,
        "Geçerli bir ahievran.edu.tr e-posta adresi girin"
      ),
    password: Yup.string()
      .required("Parola alanı zorunludur")
      .min(8, "Parola minimum 8 karakter olabilir")
      .max(100, "Parola maksimum 150 karakter olabilir")
      // .matches(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,         
          //   "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"        
          // ),
    ,
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Parolalar uyuşmuyor"
    ),
  });

  const [capVal, setCapVal] = useState(null);

  const isRegisterLoading = useSelector(
    (state) => state.auth.isRegisterLoading
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        // resetForm();
        handleOnSubmit(values);
      }}
    >
      <Form>
        <h2>Kaydol</h2>
        <small className="kisaAciklama">
          Sisteme erişmek için kaydol ve mail adresini doğrula{" "}
        </small>
        <div>
          <div className="form-group">
            <label className='signin-label' 
             htmlFor="firstName">Ad</label>
            <AdemTextInput
              name="firstname"
              type="text"
              className="text-alani"
              id="firstName"
              placeholder="Ad giriniz"
            />
          </div>
          <div className="form-group">
            <label  className='signin-label' 
            htmlFor="lastName">Soyad</label>
            <AdemTextInput
              name="lastname"
              type="text"
              className="text-alani"
              id="lastName"
              placeholder="Soyad giriniz"
            />
          </div>
          <div className="form-group">
            <label className='signin-label' 
             htmlFor="email">Kurumsal email</label>
            <AdemTextInput
              name="email"
              type="email"
              className="text-alani"
              id="email"
              placeholder="Email giriniz"
            />
          </div>

          <div className="form-group">
            <label  className='signin-label' 
            htmlFor="password">Parola</label>
            <AdemTextInput
              name="password"
              id="password"
              type="password"
              className="text-alani"
              placeholder="Parola giriniz"
            />
          </div>
          <div className="form-group">
            <label  className='signin-label' 
            htmlFor="password">Parola Tekrarı</label>
            <AdemTextInput
              name="passwordConfirmation"
              id="passwordConfirmation"
              type="password"
              className="text-alani"
              placeholder="Parola tekrarı giriniz"
            />
          </div>
          <div className="form-group">
            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(val) => {
                setCapVal(val);
              }}
            />
          </div>
          {isRegisterLoading ? (
            <LoadingButton />
          ) : (
            <button
              type="submit"
              disabled={!capVal}
              className="kaydolbtn btn btn-secondary"
            >
              Kaydol
            </button>
          )}
        </div>
        <p>
          Hesabın var mı?{" "}
          <Link to="/giris" className="link">
            Giriş yap{" "}
          </Link>
        </p>
      </Form>
    </Formik>
  );
}
