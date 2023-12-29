import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { loginController } from "../utilities/functions/loginControl";
import { useNavigate } from "react-router";

export default function KurulOnaylari() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roller = localStorage.getItem("roller");

  useEffect(() => {
    if (!loginController()) {
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

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller]);

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
