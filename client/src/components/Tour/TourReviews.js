import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {calcStars} from '../../utils/helpers';

export default function TourReviews({ selectedTour }) {
  const [reviews, setReviews] = useState('');

  //axios request get reviews
  const getReviewData = async () => {
    const response = await axios.get(
      `/api/v1/tours/${selectedTour._id}/reviews`
    );
    setReviews(response.data.data.document);
  };

  useEffect(() => {
    getReviewData();
  }, []);

  console.log(reviews);

  if(reviews){
    calcStars(reviews)
  }

  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews &&
          reviews.map((review) => {
            return (
              <div key={review.id} className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    className="reviews__avatar-img"
                    src={`/img/users/${review.user.photo}`}
                    alt="Ayla Cornell"
                  />
                  <h6 className="reviews__user">{review.user.name}</h6>
                </div>
                <p className="reviews__text">{review.review}</p>
                <div className="reviews__rating">
                  {review.numberStars.map((star) => {
                    return (
                      <i key={Math.random() * 100} className="reviews__star reviews__star--active">
                        <span className="material-icons">star</span>
                      </i>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
