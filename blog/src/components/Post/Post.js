import React from "react";
import "./Post.css";
import Pic from "../Pic/Pic";
import Highlighter from "react-highlight-words";

export default class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <div className="post__pic">
          <Pic userUrl={this.props.userUrl} online={this.props.online} />
        </div>

        <div className="post__container">
          <div className="post__first-line-container">
            <div className="post__user-name">{this.props.userName}</div>
            <div className="post__time">{this.props.time}</div>
          </div>

          <div className="post__body">
            <Highlighter
              highlightClassName="post__highlight"
              searchWords={[this.props.highlightText]}
              autoEscape={true}
              textToHighlight={this.props.body}
            />
          </div>
        </div>
      </div>
    );
  }
}
