import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/css/signup.css";
import AdemTextInput from "../../utilities/customFormControls/AdemTextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";
import LoadingButton from "../../layouts/LoadingButton";
import AeuLogo from "../../style/images/aeu.png"
import AeuUsttenFotograf from "../../style/images/aeuUsttenFotograf.jpg"
import ReCAPTCHA from "react-google-recaptcha";
import { NotificationContainer, NotificationManager } from "react-notifications";



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
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,         
      //   "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"        
      // ),
      ,

      passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Parolalar uyusmuyor')

  });

  const dispatch = useDispatch();

  const isRegisterLoading = useSelector((state) => state.auth.isRegisterLoading);

  const registerError = useSelector((state)=> state.auth.registerError);

  const navigate = useNavigate();

  const [capVal, setCapVal] = useState(null)


  function handleOnSubmit(values) {
    dispatch(addUser(values)).then((response) => {
      if (addUser.fulfilled.match(response) && response.payload.status === 200) {     
        navigate("/giris")
      }    
    });
  }
  useEffect(() => {
    if (registerError && registerError.data != null) {
      NotificationManager.error(`${registerError.data.message}`, "Kayıt Başarısız", 2800);
    }
  }, [registerError]);
  

  return (
    <div className="row">

    <div className="resim col-sm-6">
      <div className="background">
        <img className="background-image" src={AeuUsttenFotograf} alt="AeuUsttenFotograf"></img>
      </div>
      <div className="foreground">
        <img className="foreground-image" src={AeuLogo} alt="AueLogo"></img>
      </div>    
    </div>

    <div className="signup-container col-sm-6">  
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
         // resetForm();
          handleOnSubmit(values);
        }}>
        <Form>
        <h2>Kaydol</h2>
        <NotificationContainer/>
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
                  sitekey="6Le5VTEpAAAAAHI_heoEKHu7aFz0Kteoia2yMxfP"
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
    </div>
    </div>
  );
}

