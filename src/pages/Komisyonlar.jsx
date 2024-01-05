import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoginController } from "../utilities/functions/loginControl";
import Sidebar from "../layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { checkTokenExpired } from "../redux/slice/authSlice";

export default function Komisyonlar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tokenCheckError = useSelector((state) => state.auth.tokenCheckError);

  const roller = localStorage.getItem("roller");

  useEffect(() => {

    const token = localStorage.getItem("user-token");

    dispatch(checkTokenExpired(token));

    if (!LoginController()) {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate("/giris");
    }
    if (!roller.includes("ADMIN") && !roller.includes("SEKRETER")) {
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
          <Sidebar aktif={4} />
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
