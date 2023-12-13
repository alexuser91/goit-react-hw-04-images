import React, { useState, useEffect } from 'react';
import css from '../components/App.module.css';

import fetchImages from './services/api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearchSubmit = term => {
    setSearchTerm(term);
    setPage(1);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true); // Activează încărcarea

        const data = await fetchImages(searchTerm, page);

        if (data) {
          const { hits, totalHits } = data;
          setImages(prevImages =>
            page === 1 ? hits : [...prevImages, ...hits]
          );
          setLoadMore(page < Math.ceil(totalHits / 12));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Dezactivează încărcarea, indiferent de rezultat
      }
    };

    fetch();
  }, [page, searchTerm]);

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} loadMore={loadMore} />
      <div className={css.BtnContainer}>
        {loading ? (
          <Loader />
        ) : (
          loadMore && <Button onClick={loadMoreHandler} show={true} />
        )}
      </div>
      <Modal />
    </div>
  );
};

export default App;
