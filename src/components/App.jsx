import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
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
  handleSearchSubmit = query => {
    this.setState({ searchQuery: query, images: null }, () => {
      this.getImages(query);
    });
  };

  handleInputChange = event => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
  };

  handlegetImages = newImages => {
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

  getImages = async query => {
    let showPage = this.state.page;
    if (this.state.searchQuery !== query) {
      this.setState({ images: [], page: 1, totalItems: 0 });
      showPage = 1;
    }

    this.setState({ loading: true, searchQuery: query });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${showPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const resObject = response.data;

      this.setState(prevState => ({
        images: [...prevState.images, ...resObject.hits],
        totalItems: resObject.totalHits,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  showModal = id => {
    this.setState({ showModal: id });
  };

  hideModal = () => {
    this.setState({ showModal: null });
  };
  onSelect = largeImageURL => {
    window.open(largeImageURL, '_blank');
  };

  render() {
    const { images, showModal } = this.state;
    const showMore = images.length !== this.state.totalItems;
    let showImage = null;
    if (showModal) {
      showImage = images.find(image => image.largeImageURL === showModal);
    }
    return (
      <div className="App">
        <SearchBar
          onSubmit={this.handleSearchSubmit}
          onInputChange={this.handleInputChange}
          query={this.state.searchQuery}
          getImages={this.handlegetImages}
        />

        <ImageGallery
          onSelect={this.onSelect}
          showModal={this.showModal}
          images={this.state.images}
        />
        {showMore && <Button loadMore={this.loadMore} />}
        {this.state.loading && <Loader />}
        {this.state.showModal && (
          <Modal hideModal={this.hideModal} image={showImage.largeImageURL} />
        )}
      </div>
    );
  }
}
