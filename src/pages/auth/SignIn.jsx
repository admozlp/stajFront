import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/css/signin.css";
import AdemTextInput from "../../utilities/customFormControls/AdemTextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import LoadingButton from "../../layouts/LoadingButton";
import { useNavigate } from "react-router-dom";
import AeuLogo from "../../style/images/aeu.png"
import AeuUsttenFotograf from "../../style/images/aeuUsttenFotograf.jpg"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from "react-notifications";
import ReCAPTCHA from "react-google-recaptcha";



export default function SignIn() {
  const initialValues = { email: "", password: "" };

  const schema = Yup.object({
    email: Yup.string().required("Email alanı zorunludur").email("Email geçerli değil").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email geçerli değil"),
    password: Yup.string().required("Parola alanı zorunludur").max(15, "Parola maksimum 150 karakter olabilir").min(8, "Parola minimum 8 karakter olabilir")
          // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,         
      //   "Parola 8 karakterden oluşmalı, aynı zamanda en az bir büyük harf bir küçük harf, bir numara ve bir özel karakter içermelidir(#,!)"        
      // ),
  });


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoginLoading = useSelector((state)=> state.auth.isLoginLoading);

  const loginError = useSelector((state) => state.auth.loginError);

  const logoutResponse = useSelector((state) => state.auth.logoutResponse);

  const registerResponse = useSelector((state) => state.auth.registerResponse);

  const [capVal, setCapVal] = useState(null)

  

  async function handleOnSubmit(values) {
    dispatch(await login(values)).then((response) => {      
      if (login.fulfilled.match(response) && response.payload.status === 200) {      
        localStorage.clear();
        localStorage.setItem("user-token", response.payload.data.data.access_token)        
        navigate("/")
      }      
    });
  }


  useEffect(() => {
    if (logoutResponse && logoutResponse.status === 200) {
      NotificationManager.success("Çıkış yapıldı", "Çıkış başarılı", 2800);
    }
    if(loginError && loginError.data != null){
      NotificationManager.error(`${loginError.data.message}`, "Giriş Başarısız", 2800)
    }
    if(registerResponse  && registerResponse.code === 200){
      NotificationManager.info(`Mail kutunuzu kontrol ediniz.`, "Kayıt Tamamlandı", 2800)
    }
  }, [logoutResponse, loginError, registerResponse]); // useEffect'in sadece logoutResponse, loginError ve registerResponse değiştiğinde çalışmasını sağlayın
  

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
          <h2>Giriş Yap</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { resetForm}) => {            
              handleOnSubmit(values);
              resetForm();
            }}>    
            <Form>              
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
                  sitekey="6Le5VTEpAAAAAHI_heoEKHu7aFz0Kteoia2yMxfP"
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
        </div>
    </div>
  );
}
