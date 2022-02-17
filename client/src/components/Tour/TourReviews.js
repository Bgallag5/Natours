import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TourReviews({ selectedTour }) {
  const [reviews, setReviews] = useState('');

  //axios request get reviews
  const getReviewData = async () => {
    const response = await axios.get(
      `/api/v1/tours/${selectedTour._id}/reviews`
    );
    console.log(response.data.data.document);
    setReviews(response.data.data.document);
  };

  useEffect(() => {
    getReviewData();
  }, []);

  //display in JSX
  // createdAt, id, rating, review, tour, user: {name, photo, _id}

  console.log(reviews);

  reviews && reviews.forEach(review => {
    let num = Math.round(review.rating);
    console.log(num);
    review.numberStars = [];
    for (let i = 0; i < num; i++) {
      review.numberStars.push('star')
    }
  })

  

  // const calcStars = (ratingNum) => {
  //   console.log(ratingNum);
  //   let num = Math.round(ratingNum);
  //   console.log(num);

  //   for (let i = 0; i < num; i++) {
  //     numStars.push(
  //       <i className="reviews__star reviews__star--active">
  //         <span className="material-icons">star</span>
  //       </i>
  //     );
  //   }
  // };
  

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
                  {review.numberStars.map(star => {
                    return (
                      <i className="reviews__star reviews__star--active">
                      <span className="material-icons">star</span>
                    </i>
                    )
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

