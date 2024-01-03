import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { useNavigate } from "react-router";
import { LoginController } from "../utilities/functions/loginControl";
import '../style/css/staj-basvuru.css'
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkTokenExpired } from "../redux/slice/authSlice";

export default function StajBasbvurusu() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roller = localStorage.getItem("roller");

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  const isTokenChecking = useSelector((state) => state.auth.isTokenChecking);


  useEffect(() => {

    dispatch(checkTokenExpired());

    if (!LoginController()) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }
    if (!roller.includes("ADMIN") && !roller.includes("OGRENCI")) {
      setIsLoggedIn(false);
      return navigate("/access-denied");
    }

    if (tokenCheckError.response && tokenCheckError.response.data.code === 401) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller, tokenCheckError, dispatch]);

  return (
    <div>
      <div className="main">
        {isTokenChecking ?
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
      ) : isLoggedIn && localStorage.getItem("ogrenciDetay") === 'true' ? (
          <>
            <Sidebar aktif={2} />
            <div className="basvuru-container">
           
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
