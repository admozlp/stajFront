import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginController } from "../utilities/functions/loginControl";
import Sidebar from "../layouts/Sidebar";

export default function Komisyonlar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!loginController()) {
      setIsLoggedIn(false);
      return navigate("/giris");
    }
    setIsLoggedIn(true);
  }, [isLoggedIn, navigate]);

  return (
    <div className="main">
      <Sidebar aktif={5}/>
      <div className="contain">
        <h1 className="title">My React App</h1>
        <p className="info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button className="btn">Explore now</button>
      </div>
    </div>
  );
}
