import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from '../MainContainer/MainContainer';

export default class App extends React.Component {
  render() {
    return (
      <>
        <img src={logo} className="app-container__logo" alt="logo" />
        <MainContainer baseUrl="https://us-central1-mercdev-academy.cloudfunctions.net/login"/>
      </>
    );
  }
}
