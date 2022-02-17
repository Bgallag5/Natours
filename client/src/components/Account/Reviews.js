import React, { useContext } from 'react';
import { GlobalContext } from '../../App';


export default function Reviews({ page }) {
  const { currentUser } = useContext(GlobalContext);

  currentUser.reviews && currentUser.reviews.forEach(review => {
    let num = Math.round(review.rating);
    review.numberStars = [];
    for (let i = 0; i < num; i++) {
      review.numberStars.push('star')
    }
  });

  return (
    <div style={{ display: page === 'reviews' ? '' : 'none' }}>
    <div className="user-view__review-container">
      <h2 className="heading-secondary ma-bt-md">My Reviews</h2>
      <div className="reviews user-reviews">
        {currentUser && currentUser.reviews.map(review => {
            return (
                <div key={review.id} className="reviews__card">
                <div className="reviews__avatar">
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
            )
        })}
      </div>
    </div>
    </div>
  );
}
