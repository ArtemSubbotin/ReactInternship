import React from "react";
import "./Post.css";
import Pic from "../Pic/Pic";
import Highlighter from "react-highlight-words";

export default class Post extends React.Component {
  render() {
    const { userUrl, online, userName, time, highlightText, body } = this.props;

    return (
      <div className="post">
        <div className="post__pic">
          <Pic userUrl={userUrl} online={online} />
        </div>

        <div className="post__container">
          <div className="post__first-line-container">
            <div className="post__user-name">{userName}</div>
            <div className="post__time">{time}</div>
          </div>

          <div className="post__body">
            <Highlighter
              highlightClassName="post__highlight"
              searchWords={[highlightText]}
              autoEscape={true}
              textToHighlight={body}
            />
          </div>
        </div>
      </div>
    );
  }
}
