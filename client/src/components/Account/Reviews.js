import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../App';

import { calcStars } from '../../utils/helpers';
import axios from 'axios';

export default function Reviews({ page }) {
  const { currentUser } = useContext(GlobalContext);

  const [modalIsOpen, toggleModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState('');
  const [reviewText, setReviewText] = useState('');

  if (currentUser) {
    calcStars(currentUser.reviews);
  }

  const handleClickReview = (review) => {
    console.log(review);
    setSelectedReview(review);
    toggleModalIsOpen(true);
    setReviewText(review.review);
    toggleBlur();
  };
  console.log(selectedReview);

  function toggleBlur() {
    document
      .querySelector('.user-view__review-container')
      .classList.toggle('is-blurred');
    document.querySelector('.user-view__menu').classList.toggle('is-blurred');
  }

  function handleTextChange(e) {
    e.preventDefault();
    setReviewText(e.target.value);
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    console.log(selectedReview.id);
    //axios update review
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/tours/${selectedReview.tour.id}/reviews/${selectedReview.id}`,
        data: {
          review: reviewText,
        },
      });
      console.log(res);
      if (res.statusText === 'OK'){
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(reviewText);
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
      <div
        id="modal"
        className="review-edit-modal"
        style={{ display: modalIsOpen === false ? 'none' : 'block' }}
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
            toggleModalIsOpen(false);
            toggleBlur();
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
      </div>
    </div>
  );
}

{
  /* <div className="user-view__form-container">
<h2 className="heading-secondary ma-bt-md">
  {currentUser && currentUser.name}'s Settings
</h2>
<form onSubmit={handleEditProfile} className="form form-user-data">
  <div className="form__group">
    <label className="form__label">Name</label>
    <input
      className="form__input"
      placeholder={currentUser.name}
      id="name"
    />
  </div>
  <div className="form__group ma-bt-md">
    <label className="form__label">Email</label>
    <input
      className="form__input"
      placeholder={currentUser.email}
      id="email"
    />
  </div>
  <div className="form__group form__photo-upload">
    <img
      className="form__user-photo"
      src='/img/users/default.jpg'
      alt="person"
    ></img>
    <input
      className="form__upload"
      type="file"
      accept="image/*"
      id="photo"
      name="photo"
    ></input>
    <label  htmlFor="photo" onClick={handleChoosePhoto}>
      Choose New Picture
    </label>
  </div>
  <div className="form__group right">
    <button type="submit" className="btn btn-small btn-green">
      Save Settings
    </button>
  </div>
</form>
</div> */
}
