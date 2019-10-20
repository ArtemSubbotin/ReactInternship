import React from "react";
import "./Pic.css";

export default class Pic extends React.Component {
  render() {
    return (
      <img
        src={
          this.props.userUrl || "https://randomuser.me/api/portraits/lego/1.jpg"
        }
        alt="logo"
        className="pic"
      />
    );
  }
}
