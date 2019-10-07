import React from 'react';
import logo from './logo.svg';
import LoginForm from '../LoginForm/LoginForm';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <>
          <img src={logo} className="app-container__logo" alt="logo" />
          <LoginForm baseUrl="https://us-central1-mercdev-academy.cloudfunctions.net/login"/>
      </>
    );
  }
}
