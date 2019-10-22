import React from "react";
import "./App.css";
import Post from "../Post/Post";
import Header from "../Header/Header";

import { fetchPosts, fetchUsers, getRandomUserPic } from "../../api/api";

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomBool() {
  return Math.random() >= 0.5;
}

function pad(val) {
  return val < 10 ? `0${val}` : `${val}`;
}

function randomTime() {
  return `${pad(randomInt(12))}:${pad(randomInt(60))} ${
    randomBool() ? "AM" : "PM"
  }`;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsLoaded: false,
      usersLoaded: false,
      picsLoaded: false,
      posts: null,
      users: null,
      pics: null,
      searchText: null,
      cnt: 0
    };

    this.fetchData();
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  fetchData = async () => {
    let posts = await fetchPosts();
    posts.forEach(post => {
      post.time = randomTime();
    });
    this.setState({
      postsLoaded: true,
      posts: posts,
      cnt: posts.length
    });

    let users = {};
    (await fetchUsers()).forEach(user => {
      users[user.id] = { id: user.id, name: user.name, online: randomBool() };
    });

    this.setState({
      usersLoaded: true,
      users: users
    });

    let pics = {};
    await this.asyncForEach(Object.values(users), async user => {
      let pic = await getRandomUserPic();
      pics[user.id] = pic;
    });

    this.setState({
      pics: pics,
      picsLoaded: true
    });
  };

  onSearchClick = searchText => {
    this.setState({ searchText: searchText });
  };

  render() {
    if (!this.state.postsLoaded) {
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
              userUrl={
                this.state.picsLoaded ? this.state.pics[post.userId] : null
              }
              highlightText={this.state.searchText}
              userName={
                this.state.usersLoaded
                  ? this.state.users[post.userId].name
                  : null
              }
              title={post.title}
              body={post.body}
              online={
                this.state.usersLoaded && this.state.users[post.userId].online
              }
              time={post.time}
            />
          ))}
        </div>
      </div>
    );
  }
}
