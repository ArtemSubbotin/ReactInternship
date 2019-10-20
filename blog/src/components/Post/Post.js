import React from "react";
import "./Post.css";
import Pic from "../Pic/Pic";

export default class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <Pic userUrl={this.props.userUrl} />

        <div className="post__user-name">{this.props.userName}</div>

        <div className="post__title">{this.props.title}</div>
        <div>{this.props.body}</div>
        <div>{this.props.online ? "online" : "offline"}</div>
        <div>{this.props.time}</div>
      </div>
    );
  }
}
