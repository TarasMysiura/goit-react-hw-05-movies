import React, { useEffect, useState } from 'react';
import css from './Page.module.css';
import { useParams } from 'react-router-dom';
import { fetchMoviesDetailsReviews } from 'services/Api';
import { toast } from 'react-toastify';
import { toastConfig } from 'services/data';

const ReviewsPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { results } = await fetchMoviesDetailsReviews(id);
        setReviews(results);
      } catch (error) {
        toast.error('Error fetching movie details:', error, toastConfig);
      }
    };
    fetchReviews();
  }, [id]);

  return reviews.length === 0 ? (
    <h3>No Reviews.</h3>
  ) : (
    <div className={css.reviewsPage_container}>
      <h2 className={css.reviews_title}>Reviews</h2>
      <ul className={css.reviews_list}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={css.reviews_item}>
            <span className={css.reviews_span}>Author:</span> {author}
            <p className={css.reviews_text}>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
