import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from "yup";
import AdemTextInput from '../utilities/customFormControls/AdemTextInput';
import LoadingButton from './LoadingButton';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { siteKey } from '../utilities/constants/recaptcha';


export default function SigInForm({handleOnSubmit}) {
    const initialValues = { email: "", password: "" };

    const schema = Yup.object({
        email: Yup.string().required("Email alanı zorunludur").email("Email geçerli değil").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email geçerli değil"),
        password: Yup.string().required("Parola alanı zorunludur").max(15, "Parola maksimum 150 karakter olabilir").min(8, "Parola minimum 8 karakter olabilir")
              // .matches(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,         
          //   "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"        
          // ),
      });

      const [capVal, setCapVal] = useState(null)

      const isLoginLoading = useSelector((state)=> state.auth.isLoginLoading);


  return (

    <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={(values, { resetForm}) => {            
      handleOnSubmit(values);
      resetForm();
    }}>    
    <Form>          
        <h2>Giriş Yap</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <AdemTextInput
            name="email"
            type="email"
            className="text-alani"
            id="email"
            placeholder="Email adresi"                
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Parola</label>
          <AdemTextInput
            name="password"
            placeholder="Parola"
            id="password"
            type="password"
            className="text-alani"
          />
        </div>
        <div className="form-group">
          <ReCAPTCHA
          sitekey= {siteKey}
          onChange={(val) => {setCapVal(val)}}
          />

        </div>
        {
          isLoginLoading ? (
            <LoadingButton />
          ) : (          
            <button type="submit" disabled={!capVal} className="girisbtn btn btn-secondary">Giriş yap</button>
        )}
      
        <p>Hesabın yok mu? <Link to="/kayit" className="link">Kaydol</Link></p>

    </Form>
  </Formik>

)
}
