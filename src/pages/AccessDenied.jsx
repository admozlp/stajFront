import React from "react";
import "../style/css/access-denied.css";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="body">
      <div className="access-denied-container">
        <h1 className="erisim-engellendi">Erişim Engellendi</h1>
        <h2 className="forbidden">403 Forbidden</h2>
        <p className="aciklama">Üzgünüz, bu sayfaya erişim izniniz yok.</p>
        <p className="home-aciklama">
          Anasayfaya dönmek için
          <small> </small>
          <Link to="/" className="to-home">
            buraya tıklayın.
          </Link>
        </p>
      </div>
    </div>
  );
}
