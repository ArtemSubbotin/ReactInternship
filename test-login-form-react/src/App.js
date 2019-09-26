import React from 'react';
import logo from './logo.svg';
import LoginForm from './LoginForm';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LoginForm baseUrl="https://us-central1-mercdev-academy.cloudfunctions.net/login"/>
        </header>
      </div>
    );
  }
}

export default App;
