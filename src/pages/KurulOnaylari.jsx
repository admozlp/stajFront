import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { LoginController } from "../utilities/functions/loginControl";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpired } from "../redux/slice/authSlice";

export default function KurulOnaylari() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const roller = localStorage.getItem("roller");

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);


  useEffect(() => {

    const token = localStorage.getItem("user-token");

    dispatch(checkTokenExpired(token));

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

    if (
      tokenCheckError.response &&
      tokenCheckError.response.data.code === 401
    ) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller, tokenCheckError, dispatch]);

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
