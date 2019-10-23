import React from "react";
import "./App.css";
import Post from "../Post/Post";
import Header from "../Header/Header";
import { fetchData } from "./DataFetcher";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      searchText: "",
      loaded: false,
      cnt: 0
    };

    fetchData().then(posts => {
      this.setState({
        posts: posts,
        cnt: posts.length,
        loaded: true
      });
    });
  }

  onSearchClick = searchText => {
    this.setState({ searchText: searchText });
  };

  render() {
    if (!this.state.loaded) {
      return (
        <div className="app">
          <div className="app__loader">loading...</div>
        </div>
      );
    }

    let filteredPosts = this.state.posts.filter(
      post =>
        !this.state.searchText || post.body.includes(this.state.searchText)
    );

    return (
      <div className="app">
        <div className="app__header-container">
          <Header
            onSearchClick={this.onSearchClick}
            messagesCnt={this.state.cnt}
          />
        </div>

        <div className="app__posts-container">
          {filteredPosts.map(post => (
            <Post
              key={post.id}
              userUrl={post.user.pic}
              highlightText={this.state.searchText}
              userName={post.user.name}
              title={post.title}
              body={post.body}
              online={post.user.online}
              time={post.time}
            />
          ))}
        </div>
      </div>
    );
  }
}
