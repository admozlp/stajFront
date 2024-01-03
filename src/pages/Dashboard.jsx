import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import "../style/css/dashboard.css";
import "../utilities/functions/loginControl";
import { LoginController } from "../utilities/functions/loginControl";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpired } from "../redux/slice/authSlice";
import { Spinner } from "react-bootstrap";
import '../style/css/profil-eksik.css'

export default function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  const isTokenChecking = useSelector((state) => state.auth.isTokenChecking);

  useEffect(() => {
    dispatch(checkTokenExpired());

    if (!LoginController()) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }

    if (tokenCheckError.response && tokenCheckError.response.data.code === 401) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, dispatch, tokenCheckError]);

  return (
    <div className="main">
      {
        isTokenChecking ?
        (
          <div className="profil-eksik">
            <div className="access-denied-container">
              <Spinner
                as="span"
                animation="border"
                size="xl"
                role="status"
                aria-hidden="true"
              />
            </div> 
          </div>

      ) : isLoggedIn && localStorage.getItem("ogrenciDetay") === 'false' ? 
      (
          <div className="profil-eksik">
            <div className="access-denied-container">
              <h1 className="erisim-engellendi" style={{color:"white"}}>Profil Bilgileriniz eksik</h1>
              <p className="home-aciklama">
                Profilinizi tamamlamak için
                <small> </small>
                <Link to="/profilim" className="to-home">
                  buraya tıklayın.
                </Link>
              </p>
            </div>

          </div>
      ) : isLoggedIn && localStorage.getItem("ogrenciDetay") === 'true' ? 
      ( 
        <>
        <Sidebar aktif={0} />
        <div className="dash-contain">
          <h1 className="title">Burası ana sayfa</h1>
          <p className="info">
            Burada admin sekreter komisyon başkanı ve komisyon üyeleri kendi
            programlarına ait istatistikleri görecek. Öğrenciler ise staj akış
            diyagramı ve diğer bilgilendirmeleri görecek.
          </p>
          <button className="btn">Explore now</button>
        </div>
        </>
      ) : (null)
      
      }
    </div>
  );

  
}
