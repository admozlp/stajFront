import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginController } from "../utilities/functions/loginControl";
import Sidebar from "../layouts/Sidebar";

export default function RaporYaz() {
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
    <div className="main">
      {isLoggedIn ? (
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
