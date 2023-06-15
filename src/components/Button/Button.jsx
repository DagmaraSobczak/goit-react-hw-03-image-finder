import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <div className={css.position}>
        <button onClick={this.props.loadMore} className={css.Button}>
          Load More
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
