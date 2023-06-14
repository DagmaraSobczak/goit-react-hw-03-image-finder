import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  handleImageSelect = largeImageURL => {
    this.props.showModal(largeImageURL);
  };
  render() {
    return (
      <ul className={style.gallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            showModal={this.props.showModal}
            key={image.id}
            image={image}
            onSelect={this.handleImageSelect}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;