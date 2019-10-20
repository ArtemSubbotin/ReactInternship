import React from "react";
import "./Pic.css";

export default class Pic extends React.Component {
  render() {
    return (
      <div className="pic">
        <img
          src={
            this.props.userUrl ||
            "https://randomuser.me/api/portraits/lego/1.jpg"
          }
          className="pic__img"
          alt="logo"
        />

        {this.props.online && <div className="pic__online"></div>}
      </div>
    );
  }
}
