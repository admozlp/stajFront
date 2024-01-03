import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { LoginController } from "../utilities/functions/loginControl";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function KurulOnaylari() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const roller = localStorage.getItem("roller");

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);


  useEffect(() => {
    if (!LoginController()) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }
    if (
      !roller.includes("ADMIN") &&
      !roller.includes("KOMISYONBASKANI") &&
      !roller.includes("KOMISYONUYESI") &&
      !roller.includes("SEKRETER")
    ) {
      setIsLoggedIn(false);
      return navigate("/access-denied");
    }

    if(tokenCheckError && tokenCheckError.code === 401){
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller, tokenCheckError]);

  return (
    <div className="main">
      {isLoggedIn ? (
        <>
          <Sidebar aktif={3} />
          <div className="contain">
            <h1 className="title">Bu Sayfa Kurul Onayları</h1>
            <p className="info">
              Burada aktif staj dönemine ait başvurular listelenecek
            </p>
            <button className="btn">Explore now</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
