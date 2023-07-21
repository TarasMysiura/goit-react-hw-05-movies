import HomePage from 'pages/HomePage';
import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import MoviesPage from 'pages/MoviesPage';
import MovieDetailsPage from 'pages/MovieDetailsPage';

const App = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/">
            <h2>Home</h2>{' '}
          </NavLink>
          <NavLink to="/movies">
            <h2>Movies</h2>
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id/*" element={<MovieDetailsPage />} />
          {/* <Route path="/movies/:id/cast" element={<MovieDetailsPage />} />
          <Route path="/movies/:id/review" element={<MovieDetailsPage />} /> */}
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
};
export default App;
