import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../App';

import { calcStars } from '../../utils/helpers';


export default function Reviews({ page, userViewRef, handleClickReview }) {
  const { currentUser } = useContext(GlobalContext);

  // const [modalState, toggleModalState] = useState(false);
  // const [selectedReview, setSelectedReview] = useState('');
  // const [reviewText, setReviewText] = useState('');
  // const modalRef = useRef();

  // calcStars if we have a user
  currentUser && calcStars(currentUser.reviews);

  // const handleClickReview = (review) => {
  //   setSelectedReview(review);
  //   toggleModalState(true);
  //   setReviewText(review.review);
  //   handleModalChange();
  // };

  // const handleClickReview = (review) => {
  //   setSelectedReview(review);
  //   toggleModalState(true);
  //   setReviewText(review.review);
  //   handleModalChange();
  // };

  // function handleModalChange() {
  //   //toggle blur
  //   // document
  //   //   .querySelector('.user-view__review-container')
  //   //   .classList.toggle('is-blurred');
  //   // document.querySelector('.user-view__menu').classList.toggle('is-blurred');
  //   console.log(modalRef.current)
  //   userViewRef.current.classList.toggle('is-blurred');
  //   modalRef.current.focus()
  // }

  // function handleTextChange(e) {
  //   e.preventDefault();
  //   setReviewText(e.target.value);
  // }

  // async function handleReviewSubmit(e) {
  //   e.preventDefault();
  //   //axios update review
  //   try {
  //     const res = await axios({
  //       method: 'PATCH',
  //       url: `/api/v1/tours/${selectedReview.tour.id}/reviews/${selectedReview.id}`,
  //       data: {
  //         review: reviewText,
  //       },
  //     });
  //     console.log(res);
  //     if (res.statusText === 'OK') {
  //       //alert
  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div style={{ display: page === 'reviews' ? 'block' : 'none' }}>
      <div className="user-view__review-container">
        <h2 className="heading-secondary ma-bt-md">My Reviews</h2>
        <div className="reviews user-reviews">
          {currentUser &&
            currentUser.reviews.map((review) => {
              return (
                <div
                  onClick={() => handleClickReview(review)}
                  key={review.id}
                  className="reviews__card"
                >
                  <div className="reviews__avatar">
                    <h6 className="reviews__user">{review.user.name}</h6>
                  </div>
                  <p className="reviews__text">{review.review}</p>
                  <div className="reviews__rating">
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
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <div
        className="review-edit-modal"
        ref={modalRef}
        style={{ display: modalState === false ? 'none' : 'inline' }}
      >
        <form className="form form__group">
          <h2 className="heading-secondary ma-bt-md">
            {selectedReview && selectedReview.tour.name}
          </h2>
          <h4>Review written at: Date</h4>
          <label className="form__label">My Review:</label>
          <textarea
            id="review-text-edit"
            value={reviewText}
            onChange={(e) => handleTextChange(e)}
          ></textarea>
        </form>
        <button
          className="btn btn-small"
          onClick={() => {
            toggleModalState(false);
            handleModalChange();
          }}
        >
          Close
        </button>
        <button
          onClick={(e) => handleReviewSubmit(e)}
          className="btn btn-green btn-small"
        >
          Save Review
        </button>
      </div> */}
    </div>
  );
}
