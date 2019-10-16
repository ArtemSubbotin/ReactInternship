import React from "react";
import "./App.css";
import SearchField from "../SearchField/SearchField";
import Post from "../Post/Post";

import { fetchPosts, fetchUsers, getRandomUserPic } from "../../api/api";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      posts: null,
      users: null,
      searchText: null
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
    let users = await fetchUsers();

    let userDict = {};

    await this.asyncForEach(users, async user => {
      let pic = await getRandomUserPic();
      userDict[user.id] = { name: user.name, pic: pic };
    });

    this.setState({
      loaded: true,
      posts: posts,
      users: userDict
    });
  };

  onSearchClick = searchText => {
    this.setState({ searchText: searchText });
  };

  render() {
    if (this.state.loaded)
      return (
        <div className="app">
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
                      userUrl={this.state.users[post.userId].pic}
                      highlightText={this.state.searchText}
                      userName={this.state.users[post.userId].name}
                      title={post.title}
                      body={post.body}
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
