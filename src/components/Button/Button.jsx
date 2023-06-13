import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.loadMore} className={style.Button}>
        Load More
      </button>
    );
  }
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
