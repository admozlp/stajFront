import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { loginController } from "../utilities/functions/loginControl";
import "../style/css/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!loginController()) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }
    setIsLoggedIn(true);
  }, [isLoggedIn, navigate]);

  return (
    <div className="main">
      {isLoggedIn ? (
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
      ) : null}
    </div>
  );
}
