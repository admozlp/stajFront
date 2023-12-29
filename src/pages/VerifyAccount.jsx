import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { verifyAccount } from "../redux/slice/authSlice";
import "../style/css/verifyAccount.css";
import { Spinner } from "react-bootstrap";
import "react-bootstrap-icons";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function VerifyAccount() {
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAccount(token));
  }, [token, dispatch]);

  const isVerifyPending = useSelector((state) => state.auth.isVerifyPending);
  const verifyResponse = useSelector((state) => state.auth.verifyResponse);
  const verifyError = useSelector((state) => state.auth.verifyError);

  return (
    <div className="account-verification">
      {isVerifyPending ? (
        <div className="access-denied-container">
          <Spinner
            as="span"
            animation="border"
            size="xl"
            role="status"
            aria-hidden="true"
          />
        </div> // progressbar
      ) : verifyResponse ? (
        <div className="access-denied-container">
          <p className="success-message">
            Email adresi doğrulandı,  <Link to="/giris" style={{textDecoration:"none"}}>buradan</Link> giriş yapabilirsiniz
            <p style={{ marginBottom: 30 }}></p>
            <CheckCircleFill size={100} />
          </p>
        </div> // hesabınız doğrulandı bu ekranı kapatabilir ve giriş yapabilirsiniz
      ) : verifyError && verifyError.response ? (
        <div className="access-denied-container">
          <h1 className="erisim-engellendi">
            {verifyError.response.data.message}
          </h1>
          <h2 className="forbidden">400 Bad Request</h2>
        </div> // (error) doğrulanamama nedeni
      ) : null}
    </div>
  );
}
