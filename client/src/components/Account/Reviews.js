import React, { useContext } from "react";
import { GlobalContext } from "../../App";
import { buildStars, formatDate } from "../../utils/helpers";

// import { calcStars } from '../../utils/helpers';

export default function Reviews({
  page,
  userViewRef,
  handleClickReview,
  currentUser,
}) {
  console.log(currentUser);
  // calcStars if we have a user
  // currentUser && calcStars(currentUser.reviews);
  console.log(currentUser.reviews[0]);
  console.log(formatDate(currentUser.reviews[0].createdAt));

  return (
    <div style={{ display: page === "reviews" ? "block" : "none" }}>
      <div className="user-view__review-container">
        <h2 className="heading-secondary ma-bt-md">My Reviews</h2>
        <div className="my-reviews">
          {currentUser &&
            currentUser.reviews.map((review) => {
              const reviewStars = buildStars(review.rating, 'star--small');
              return (
                <>
                  <div className="my-reviews__info">
                    <h1>{review.tour.name}</h1>
                      <h2>Reviewed on: {formatDate(review.createdAt)}</h2>
                    <div className="stars__container">
                    {reviewStars}
                    </div>

                  </div>
                  <div
                    onClick={() => handleClickReview(review)}
                    key={review.id}
                    className="my-reviews__card"
                  >
                    <div className="reviews__avatar"></div>
                    <p className="reviews__text">{review.review}</p>
                    {/* <div className="reviews__rating">
                    {review.numberStars.map((star) => {
                      return (
                        <i
                          key={Math.random() * 1000}
                          className="reviews__star reviews__star--active"
                        >
                          <span className="material-icons">star</span>
                        </i>
                      );
                    })}
                  </div> */}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
