import React from "react";
import Sidebar from "../layouts/Sidebar";

export default function StajBasbvurusu() {
  return (
    <div>
      <div className="main">
        <Sidebar  aktif={3}/>
        <div className="contain">
          <h1 className="title">My React App</h1>
          <p className="info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button className="btn">Explore now</button>
        </div>
      </div>
    </div>
  );
}
