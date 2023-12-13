import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ image }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <li className={css.GalleryItem} onClick={openModal}>
        <img
          src={image.webformatURL}
          alt={`${image.id}`}
          className={css.GalleryItemImage}
        />
      </li>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        imageUrl={image.largeImageURL}
        altText={`${image.id}`}
      />
    </>
  );
};

export default ImageGalleryItem;
