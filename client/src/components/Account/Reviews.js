import React from "react";
import { buildStars, formatDate } from "../../utils/helpers";

export default function Reviews({
  page,
  userViewRef,
  handleClickReview,
  currentUser,
}) {
  console.log(currentUser);

  return (
    <div style={{ display: page === "reviews" ? "block" : "none" }}>
      <div className="user-view__review-container">
        <h2 className="heading-secondary ma-bt-md">My Reviews</h2>
        <div className="my-reviews">
          {currentUser &&
            currentUser.reviews.map((review) => {
              const reviewStars = buildStars(review.rating, "star--small");
              return (
                <React.Fragment key={review.id}>
                  <div className="my-reviews__info">
                    <h1>{review.tour.name}</h1>
                    <h2>Reviewed on: {formatDate(review.createdAt)}</h2>
                    <div className="stars__container">{reviewStars}</div>
                  </div>
                  <div
                    onClick={() => handleClickReview(review)}
                    key={review.id}
                    className="my-reviews__card"
                  >
                    <div className="reviews__avatar"></div>
                    <p className="reviews__text">{review.review}</p>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
}
