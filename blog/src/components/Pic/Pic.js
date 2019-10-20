import React from "react";
import "./Pic.css";

export default function Pic(props) {
  return (
    <div className="pic">
      <img
        src={props.userUrl || "https://randomuser.me/api/portraits/lego/1.jpg"}
        className="pic__img"
        alt="logo"
      />

      {props.online && <div className="pic__online"></div>}
    </div>
  );
}
