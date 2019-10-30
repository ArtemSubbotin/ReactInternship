import React from "react";
import "./Post.css";
import Pic from "../Pic/Pic";
import Highlighter from "react-highlight-words";

export default class Post extends React.Component {
  render() {
    const { post, highlightText } = this.props;

    return (
      <div className="post">
        <div className="post__pic">
          <Pic userUrl={post.user.pic} online={post.user.online} />
        </div>

        <div className="post__container">
          <div className="post__first-line-container">
            <div className="post__user-name">{post.user.name}</div>
            <div className="post__time">{post.time}</div>
          </div>

          <div className="post__body">
            <Highlighter
              highlightClassName="post__highlight"
              searchWords={[highlightText]}
              autoEscape={true}
              textToHighlight={post.body}
            />
          </div>
        </div>
      </div>
    );
  }
}
