import React from "react";
import "./Post.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post">
        <img src={this.props.userUrl} alt="logo" className="post__user-image" />

        <div className="post__user-name">{this.props.userName}</div>

        <div className="post__title">{this.props.title}</div>
        <div>{this.props.body}</div>
        <div>{this.props.online ? "online" : "offline"}</div>
        <div>{this.props.time}</div>
      </div>
    );
  }
}
