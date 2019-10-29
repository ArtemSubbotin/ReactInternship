import React from "react";
import "./Header.css";
import SearchField from "../SearchField/SearchField";

export default function Header({ messagesCnt, onSearchClick }) {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__massages-container">
          <p className="header__massages-title">Messages</p>
          <span className="header__counter">{messagesCnt}</span>
        </div>

        <SearchField
          onSearchClick={onSearchClick}
          className="header__search-field"
        />
      </div>
    </div>
  );
}
