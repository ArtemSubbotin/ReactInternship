import React from "react";
import "./App.css";
import SearchField from "../SearchField/SearchField";
import Post from "../Post/Post";

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
    this.setState({
      postsLoaded: true,
      posts: posts,
      cnt: posts.length
    });

    let users = {};
    (await fetchUsers()).forEach(user => {
      users[user.id] = { id: user.id, name: user.name };
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
    if (this.state.postsLoaded)
      return (
        <div className="app">
          <div>
            <h1>Messages</h1>
            <div>{this.state.cnt}</div>
          </div>
          <div>
            <SearchField onSearchClick={this.onSearchClick} />
          </div>
          <div>
            <ul>
              {this.state.posts
                .filter(post => {
                  return (
                    !this.state.searchText ||
                    post.body.includes(this.state.searchText) ||
                    post.title.includes(this.state.searchText)
                  );
                })
                .map(post => (
                  <li>
                    <Post
                      userUrl={
                        this.state.picsLoaded
                          ? this.state.pics[post.userId]
                          : "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      highlightText={this.state.searchText}
                      userName={
                        this.state.usersLoaded
                          ? this.state.users[post.userId].name
                          : ""
                      }
                      title={post.title}
                      body={post.body}
                      online={randomBool()}
                      time={randomTime()}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    else return <div className="app">loading...</div>;
  }
}
