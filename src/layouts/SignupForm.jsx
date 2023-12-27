import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import AdemTextInput from '../utilities/customFormControls/AdemTextInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { siteKey } from '../utilities/constants/recaptcha';
import LoadingButton from './LoadingButton';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { useSelector } from 'react-redux';


export default function SignupForm({handleOnSubmit}) {
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
          // .matches(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,         
          //   "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"        
          // ),
          ,
    
          passwordConfirmation: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Parolalar uyusmuyor')
    
      });
    
    const [capVal, setCapVal] = useState(null)

    const isRegisterLoading = useSelector((state) => state.auth.isRegisterLoading);

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={(values, { resetForm }) => {
     // resetForm();
      handleOnSubmit(values);
    }}>
    <Form>
    <h2>Kaydol</h2>
    <small className="kisaAciklama">Sisteme erişmek için kaydol ve mail adresini doğrula </small>
      <div>
        <div className="form-group">
          <label htmlFor="firstName">Ad</label>
          <AdemTextInput
            name="firstname"
            type="text"
            className="text-alani"
            id="firstName"
            placeholder="Ad giriniz"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Soyad</label>
          <AdemTextInput
            name="lastname"
            type="text"
            className="text-alani"
            id="lastName"
            placeholder="Soyad giriniz"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <AdemTextInput
            name="email"
            type="email"
            className="text-alani"
            id="email"
            placeholder="Email giriniz"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Parola</label>
          <AdemTextInput
            name="password"
            id="password"
            type="password"
            className="text-alani"
            placeholder="Parola giriniz"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Parola Tekrarı</label>
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
              sitekey= {siteKey}
              onChange={(val) => {setCapVal(val)}}
            />
        </div>
        {
        isRegisterLoading ? (
          <LoadingButton />
        ) : (
          <button type="submit" disabled={!capVal} className="kaydolbtn btn btn-secondary">Kaydol</button>
        )}
      </div>
      <p>Hesabın var mı? <Link to="/giris" className="link">Giriş yap </Link></p>
    </Form>

  </Formik>  
  )
}
