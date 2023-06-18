import React, { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import axios from 'axios';
import Loader from './Loader/Loader';
/*import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';*/

const API_KEY = '34772301-2558f091501b1829db2bd0b62';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    showModal: null,
    totalItems: 0,
  };

  getImages = async () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const resObject = response.data;
      const newImages = resObject.hits;

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalItems: resObject.totalHits,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };
  handleSearchSubmit = query => {
    this.setState({ searchQuery: query, images: null }, () => {
      this.getImages(query);
    });
  };

  handleInputChange = event => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
  };

  handleGetImages = newImages => {
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
    }));
  };
  loadMore = () => {
    const { searchQuery, page } = this.state;
    const nextPage = page + 1;

    this.setState(
      {
        page: nextPage,
      },
      () => {
        this.getImages(searchQuery);
      }
    );
  };

  showModal = index => {
    this.setState({ showModal: index });
  };

  hideModal = () => {
    this.setState({ showModal: null });
  };
  onSelect = largeImageURL => {
    this.setState({ showModal: largeImageURL });
    /*window.open(largeImageURL, '_blank');*/
  };

  render() {
    const { images, showModal } = this.state;
    const showMore = images.length !== this.state.totalItems;
    let showImage = null;
    if (showModal) {
      showImage = images.find(image => image.largeImageURL === showModal);
    }
    if (!showImage || !showImage.largeImageURL) {
      showImage = null;
    }
    return (
      <div className="App">
        <SearchBar
          onSubmit={this.handleSearchSubmit}
          onInputChange={this.handleInputChange}
          query={this.state.searchQuery}
          getImages={this.handleGetImages}
        />

        <ImageGallery
          onSelect={this.onSelect}
          showModal={this.showModal}
          images={this.state.images}
        />
        {showMore && <Button loadMore={this.loadMore} />}
        {this.state.loading && <Loader />}
        {this.state.showModal && (
          <Modal hideModal={this.hideModal} image={showImage} />
        )}
      </div>
    );
  }
}
