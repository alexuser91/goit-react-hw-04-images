import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ isOpen, onClose, imageUrl, altText }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose, handleClickOutside]);

  try {
    return isOpen
      ? createPortal(
          <div className={css.Overlay} onClick={handleClickOutside}>
            <div className={css.Modal}>
              <img src={imageUrl} alt={altText} />
            </div>
          </div>,
          modalRoot
        )
      : null;
  } catch (error) {
    console.error('Error rendering Modal:', error);
    return null;
  }
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default Modal;
