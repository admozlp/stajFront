import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/css/signup.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";
import AeuLogo from "../../style/images/aeu.png"
import { NotificationManager } from "react-notifications";
import SignupForm from "../../layouts/SignupForm";



export default function SignUp() {


  const dispatch = useDispatch();


  const registerError = useSelector((state)=> state.auth.registerError);

  const navigate = useNavigate();

  function handleOnSubmit(values) {
    dispatch(addUser(values)).then((response) => {
      if (addUser.fulfilled.match(response) && response.payload.status === 200) {     
        navigate("/giris")
      }    
    });
  }
  
  useEffect(() => {
    if (registerError && registerError.data != null) {
      if (registerError.data.errorFields) {
        Object.entries(registerError.data.errorFields).forEach(([key, value]) => {
          NotificationManager.error(`${value}`, "Kayıt Başarısız", 4000);
        });
      } else {
        NotificationManager.error(`${registerError.data.message}`, "Kayıt Başarısız", 4000);
      }
    }
  }, [registerError]);
  

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
        <SignupForm  handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  );
}

