import React from "react";
import "../style/css/page-not-found.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
      <div className="body-not-found">
        <div className="content">
          <h1>404</h1>
          <p>Sayfa Bulunamadı</p>
          <Link to="/" className="button">
            Ana Sayfa            
          </Link>
        </div>
      </div>
  );
}
