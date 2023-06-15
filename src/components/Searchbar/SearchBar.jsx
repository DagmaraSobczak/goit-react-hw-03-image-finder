import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.getImages(this.state.query);
  };

  handleChange = event => {
    this.props.onInputChange(event);
    this.setState({ query: event.target.value });
  };

  handleFetchImages = event => {
    this.props.getImages(this.state.query);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonaLabel}>Search</span>
          </button>
          <input
            name="query"
            className={css.searchFormInput}
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
