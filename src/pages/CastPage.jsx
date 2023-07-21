import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMoviesDetailsCast } from 'services/Api';
import { toastConfig } from 'services/data';
import css from './Page.module.css';

const CastPage = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetchMoviesDetailsCast(id);
        setCast(response.cast);
      } catch (error) {
        toast.error('Error fetching movie details:', error, toastConfig);
      }
    };
    fetchCast();
  }, [id]);

  return (
    <div className={css.castPage_container}>
      <h2 className={css.cast_title}>Cast</h2>
      <ul className={css.cast_list}>
        {cast.map(({ id, profile_path, original_name, character }) => (
          <li key={id} className={css.cast_item}>
            <img
              src={
                profile_path !== null
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              // src = urt
              className={css.cast_img}
              alt={original_name}
            />
            <p className={css.cast_text_name}>
              <span> Actor:</span> {original_name}
            </p>
            <p className={css.cast_text}>
              <span>Character:</span> {character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastPage;
