import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SearchBar.module.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.query);
  };

  handleChange = event => {
    this.props.onInputChange(event);
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <span className={style.searchFormButtonabel}>Search</span>
          </button>
          <input
            name="query"
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.props.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  getImages: PropTypes.func.isRequired,
};

export default SearchBar;
