import React from 'react';
import logo from './logo.svg';
import LoginForm from './LoginForm';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
          <img src={logo} className="app-container__logo" alt="logo" />
          <LoginForm baseUrl="https://us-central1-mercdev-academy.cloudfunctions.net/login"/>
      </div>
    );
  }
}

export default App;
