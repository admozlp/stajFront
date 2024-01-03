import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoginController } from "../utilities/functions/loginControl";
import Sidebar from "../layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpired } from "../redux/slice/authSlice";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RaporYaz() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  const isTokenChecking = useSelector((state) => state.auth.isTokenChecking);

  const roller = localStorage.getItem("roller");

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
    <div className="main">
      {isTokenChecking ? (
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
      ) : isLoggedIn && localStorage.getItem("ogrenciDetay") === "false" ? (
        <div className="profil-eksik">
          <div className="access-denied-container">
            <h1 className="erisim-engellendi" style={{ color: "white" }}>
              Profil Bilgileriniz eksik
            </h1>
            <p className="home-aciklama">
              Profilinizi tamamlamak için
              <small> </small>
              <Link to="/profilim" className="to-home">
                buraya tıklayın.
              </Link>
            </p>
          </div>
        </div>
      ) : isLoggedIn && localStorage.getItem("ogrenciDetay") === "true" ? (
        <>
          <Sidebar aktif={5} />
          <div className="contain">
            <h1 className="title">My React App</h1>
            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className="btn">Explore now</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
