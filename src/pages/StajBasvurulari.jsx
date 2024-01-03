import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { useNavigate } from "react-router";
import { LoginController } from "../utilities/functions/loginControl";
import { useSelector } from "react-redux";

export default function StajBasvurulari() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roller = localStorage.getItem("roller");
  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  useEffect(() => {
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

    if (tokenCheckError && tokenCheckError.code === 401) {
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
