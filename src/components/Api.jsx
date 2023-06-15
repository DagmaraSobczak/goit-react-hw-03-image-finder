import { Component } from 'react';
class PixabayAPI extends Component {
  fetchImages = async () => {
    const { searchQuery, apiKey, onFetchImages } = this.props;

    try {
      const url = `https://pixabay.com/api/?q=${searchQuery}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
      const response = await fetch(url);
      const data = await response.json();

      onFetchImages(data.hits);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return null; // Ten komponent nie renderuje niczego, po prostu obsługuje zapytanie do API
  }
}

export default PixabayAPI;
