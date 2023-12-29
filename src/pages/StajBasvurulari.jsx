import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { useNavigate } from "react-router";
import { loginController } from "../utilities/functions/loginControl";

export default function StajBasvurulari() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roller = localStorage.getItem("roller");

  useEffect(() => {
    if (!loginController()) {
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

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller]);

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
