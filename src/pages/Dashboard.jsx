import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { loginController } from "../utilities/functions/loginControl";
import "../style/css/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  // const [isSidebarOpen, setSidebarOpen] = useState(true);

  // const handleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen) 
  // }


  useEffect(() => {
    if (!loginController()) {
      setIsLoggedIn(false);
      return navigate("/giris");
    }
    setIsLoggedIn(true);
  }, [isLoggedIn, navigate]);

  return (
    <div className="main">
      <Sidebar aktif={0}/>
      <div className="contain">
        <h1 className="title">Benim React uygulamam</h1>
        <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        fasldnfnasdfşasnfşasrşfhnasşfjhdsşrgfasfasdnfasnfaksnfkankerfjnkewr
        glasnjrglşsdhngesht</p>
        <button className="btn">Explore now</button>
      </div>
    </div>
  );
}
