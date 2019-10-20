import React from "react";
import "./SearchField.css";

function classNames(baseClassName, extraClassName) {
  //it doesn't look like we need to add the package to use its functionality only in one simple place
  if (extraClassName) return `${baseClassName} ${extraClassName}`;
  else return baseClassName;
}

export default class SearchField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: null
    };
  }

  onSearchTextChange = event => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    return (
      <div className={classNames("search-field", this.props.className)}>
        <input
          className="search-field__input"
          type="text"
          value={this.state.searchText || ""}
          onChange={this.onSearchTextChange}
          placeholder="Search"
        />

        <button
          className="search-field__button button"
          onClick={() => {
            this.props.onSearchClick(this.state.searchText);
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}
