import React, { useEffect } from "react";
import "../../style/css/signin.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import AeuLogo from "../../style/images/aeu.png"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from "react-notifications";
import SigInForm from "../../layouts/SigInForm";
import Cookies from 'js-cookie';




export default function SignIn() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginError = useSelector((state) => state.auth.loginError);

  const logoutResponse = useSelector((state) => state.auth.logoutResponse);

  const registerResponse = useSelector((state) => state.auth.registerResponse);

  function handleOnSubmit(values) {
    if(values.remember){
      Cookies.set('email',values.email)
      Cookies.set('password',values.password)
      Cookies.set('remember',true)
    }else{
      Cookies.remove('email')
      Cookies.remove('password')
      Cookies.remove('remember')
    }

    dispatch( login(values)).then((response) => {  
          
      if (login.fulfilled.match(response) && response.payload.status === 200) {      
  
        localStorage.clear();

        localStorage.setItem("user-token", response.payload.data.data.access_token)        
        localStorage.setItem("roller", response.payload.data.data.roller)
        if(response.payload.data.data.ogrenciDetay && 
          response.payload.data.data.ogrenciDetay[0] === false){
            localStorage.setItem("ogrenciDetay", response.payload.data.data.ogrenciDetay[0])
          }
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
  }, [logoutResponse, loginError, registerResponse]); 
  // useEffect'in sadece logoutResponse, loginError ve registerResponse 
  // değiştiğinde çalışmasını sağlayın
  

  return (        
    <div className="row">
        <div className="resim col-sm-6">
              <div className="background">
              
              </div>
              <div className="foreground">
                <img className="foreground-image" src={AeuLogo} alt="AueLogo"></img>
              </div>          
        </div>

        <div className="signup-container col-sm-6">            
            <SigInForm handleOnSubmit={handleOnSubmit}/>
        </div>
    </div>
  );
}
