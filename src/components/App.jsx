import React, { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
/*import fetchData from './services/apiService';*/
import axios from 'axios';
import Loader from './Loader/Loader';
/*import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';*/
import PixabayAPI from './Api';

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
    this.setState({ searchQuery: query, images: [] });
  };

  handleFetchImages = newImages => {
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
    }));
  };
  loadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.getImages(this.state.searchQuery);
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
  handleImageSelect = largeImageURL => {
    console.log('Selected image URL:', largeImageURL);
  };

  render() {
    const showMore = this.state.images.length !== this.state.totalItems;
    let showImage = null;
    if (this.state.showModal) {
      showImage = this.state.images.filter(
        image => image.id === this.state.showModal
      )[0];
    }

    return (
      <div className="App">
        <SearchBar
          getImages={this.getImages}
          onSubmit={this.handleSearchSubmit}
        />
        <PixabayAPI
          searchQuery={this.state.searchQuery}
          apiKey={API_KEY}
          onFetchImages={this.handleFetchImages}
        />
        <ImageGallery
          onSelect={this.handleImageSelect}
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
