import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  handleImageSelect = largeImageURL => {
    this.props.onSelect(largeImageURL);
  };

  render() {
    return (
      <ul className={css.imageGallery}>
        {this.props.images.map((image, index) => (
          <ImageGalleryItem
            showModal={this.props.showModal}
            key={index} // Używamy indeksu jako klucza
            image={image}
            onSelect={this.handleImageSelect}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;
