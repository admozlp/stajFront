import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { useNavigate } from "react-router";
import { LoginController } from "../utilities/functions/loginControl";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpired } from "../redux/slice/authSlice";

export default function StajBasvurulari() {
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
          <Sidebar aktif={1} />
          <div className="contain">
            <h1 className="title">Burası tüm başvuruların olduğu sayfa</h1>
            <p className="info">
              SEKRETER KOMISYONBASKANI ve KOMISYONUYELERİ kendi programlarındaki
              başvuruları görebilecek bu sayfadan staj onaylama değerlendirme
              sayfasına gidecek (öğrenci tarafından oluşturulmuş ek 2 belgesini
              görebilecek). Admin ise tüm başvuruları görebilecek.
            </p>
            <button className="btn">Explore now</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
