import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

class Modal extends Component {
  render() {
    return (
      <div className={style.overlay} onClick={() => this.props.hideModal()}>
        <div className={style.modal}>
          <img
            className={style.modal_img}
            src={this.props.image.largeImageURL}
            alt=""
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
