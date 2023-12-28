import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { loginController } from "../utilities/functions/loginControl";
import { useNavigate } from "react-router";

export default function KurulOnaylari() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const roller = localStorage.getItem("roller");

  useEffect(() => {
    if (!loginController() ) {
      setIsLoggedIn(false);
      return navigate("/giris");
    }
    if(!roller.includes("ADMIN") && !roller.includes("KOMISYONBASKANI") 
    && !roller.includes("KOMISYONUYESI") && !roller.includes("SEKRETER")){
      setIsLoggedIn(false);
      return navigate("/access-denied")
    }

    setIsLoggedIn(true);
  }, [isLoggedIn, navigate, roller]);


  return (
    <div className="main">
      <Sidebar aktif={3}/>
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
