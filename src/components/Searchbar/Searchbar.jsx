import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [movieName, setMovieName] = useState('');

  //   const handleNameChange = () => {};
  //   const handleSubmit = () => {};
  const handleNameChange = event => {
    setMovieName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (movieName.trim() === '') {
      toast.error('Please, input image name');
      return;
    }
    // console.log(movieName);
    onSubmit(movieName);
    setMovieName('');
  };

  return (
    <div>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch style={{ fontSize: 25 }} />
          </button>
          <input
            onChange={handleNameChange}
            value={movieName}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </form>
      </header>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
