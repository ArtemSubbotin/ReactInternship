import React from "react";
import "./Header.css";
import SearchField from "../SearchField/SearchField";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header__container">
          <div className="header__massages-container">
            <p className="header__massages-title">Messages</p>
            <span className="header__counter">{this.props.messagesCnt}</span>
          </div>

          <SearchField
            onSearchClick={this.props.onSearchClick}
            className="header__search-field"
          />
        </div>
      </div>
    );
  }
}
