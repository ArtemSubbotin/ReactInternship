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

  submitForm = event => {
    event.preventDefault();
    this.props.onSearchClick(this.state.searchText);
  };

  render() {
    return (
      <form
        onSubmit={this.submitForm}
        className={classNames("search-field", this.props.className)}
      >
        <label htmlFor="searchTextId">
          <input
            id="searchTextId"
            className="search-field__input"
            type="text"
            value={this.state.searchText || ""}
            onChange={this.onSearchTextChange}
            placeholder="Search"
          />
        </label>

        <button type="submit" className="search-field__button button">
          <i className="fa fa-search"></i>
        </button>
      </form>
    );
  }
}
