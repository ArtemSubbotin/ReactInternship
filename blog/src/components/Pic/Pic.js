import React from "react";
import "./Pic.css";

export default function Pic({ userUrl, online }) {
  return (
    <div className="pic">
      <img
        src={userUrl || "https://randomuser.me/api/portraits/lego/1.jpg"}
        className="pic__img"
        alt="logo"
      />

      {online && <div className="pic__online"></div>}
    </div>
  );
}
