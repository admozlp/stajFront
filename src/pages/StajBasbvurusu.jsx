import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { useNavigate } from "react-router";
import { loginController } from "../utilities/functions/loginControl";

export default function StajBasbvurusu() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roller = localStorage.getItem("roller");

  useEffect(() => {
    if (!loginController()) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }
    if (!roller.includes("ADMIN") && !roller.includes("OGRENCI")) {
      setIsLoggedIn(false);
      return navigate("/access-denied");
    }

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller]);

  return (
    <div>
      <div className="main">
        {isLoggedIn ? (
          <>
            <Sidebar aktif={2} />
            <div className="contain">
              <h1 className="title">Burası Staj Başvuru Sayfası</h1>
              <p className="info">
                Bu sayfayı ÖĞRENCİLER (ve admin) görebilecek. burada EK-2
                belgesi doldurma işlemlerini yapacaklar. Doldurduktan sonra
                çıktısını alıp imzalatıp, imzalı halini yükleyebilecekler.
              </p>
              <button className="btn">Explore now</button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
