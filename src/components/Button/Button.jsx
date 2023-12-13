import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick, show }) => {
  return (
    <button
      onClick={onClick}
      className={css.LoadMoreButton}
      style={{ display: show ? 'block' : 'none' }}
    >
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Button;
