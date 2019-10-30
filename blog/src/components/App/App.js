import React, { Component } from "react";
import { observer } from "mobx-react";
import "./App.css";
import Post from "../Post/Post";
import Header from "../Header/Header";
import { mainModel } from "../../models/MainModel";

class App extends Component {
  constructor(props) {
    super(props);

    mainModel.loadPosts();
  }

  render() {
    if (!mainModel.loaded) {
      return (
        <div className="app">
          <div className="app__loader">loading...</div>
        </div>
      );
    }

    return (
      <div className="app">
        <div className="app__header-container">
          <Header
            onSearchClick={input => mainModel.setSearchText(input)}
            messagesCnt={mainModel.cnt()}
          />
        </div>

        <div className="app__posts-container">
          {mainModel.filteredPosts().map(post => (
            <Post
              post={post}
              key={post.id}
              highlightText={mainModel.searchText}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default observer(App);
