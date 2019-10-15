import React from 'react';
import './App.css';

import {fetchPosts, fetchUsers, getRandomUserPic} from '../../api/api';

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      loaded: false,
      posts: null,    
      users: null,
    }

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
    
    await this.asyncForEach(users, async (user) => {
      let pic = await getRandomUserPic();
      userDict[user.id] = { name: user.name, pic: pic };       
    })

    this.setState(
      {
        loaded: true,
        posts: posts,
        users: userDict
      });
  }

  render() {
    if (this.state.loaded)
      return (
        <div className="app">
          <ul>
            {this.state.posts.map((post) => 
              (
                <li className="app__item">
                  <div>

                    <img src={this.state.users[post.userId].pic} alt="logo" className="app__user-image"/>

                    <div className="app__user-name">
                      {this.state.users[post.userId].name}
                    </div>

                    <div className="app__title">
                      {post.title}
                    </div>
                    <dic>
                      {post.body}
                    </dic>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      );
    else
      return (
        <div className="app">
          loading...
        </div>
      );
  }
}
