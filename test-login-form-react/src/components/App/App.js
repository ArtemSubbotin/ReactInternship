import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from '../MainContainer/MainContainer';

export default class App extends React.Component {
  render() {
    return (
      <div className="app__container">
        <img src={logo} className="app__logo" alt="logo" />
        <MainContainer baseUrl="https://us-central1-mercdev-academy.cloudfunctions.net/login"/>
      </div>
    );
  }
}
