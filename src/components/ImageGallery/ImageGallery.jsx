import React, { useEffect } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  useEffect(() => {}, [images]);

  return (
    <div className={css.SectionGallery}>
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem key={`image-${image.id}`} image={image} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
