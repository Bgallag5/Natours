import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {buildStars} from '../../utils/helpers';
import {useSelector, useDispatch} from 'react-redux';

export default function Modal({ props }) {
  const {
    // selectedReview,
    reviewText,
    modalState,
    handleTextChange,
    handleModalChange,
  } = props;

  const {selectedReview} = useSelector(state => state)

  const modalRef = useRef();

  const [editedRating, setEditedRating] = useState(selectedReview?.rating);

  useEffect(() => {
    selectedReview && setEditedRating(selectedReview.rating)
  }, [selectedReview])

  async function handleReviewSubmit(e) {
    e.preventDefault();
    //axios update review
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/tours/${selectedReview?.tour.id}/reviews/${selectedReview.id}`,
        data: {
          review: reviewText,
          rating: Number(editedRating)
        },
      });
      if (res.statusText === 'OK') {
        //alert
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const starsRef = useRef();

  const ReviewStars = useCallback((rating = editedRating) => {
    console.log(rating);
    let stars = buildStars(rating, "star--small");

    return <div ref={starsRef}>{stars}</div> ;
  }, [editedRating])

  starsRef.current?.querySelectorAll('.reviews__star').forEach((star, i) => {
    star.addEventListener('click', () => setEditedRating(i + 1)) 
  });

console.log(selectedReview);


  return (
    <div
      className="review-edit-modal"
      style={{ display: modalState === false ? 'none' : 'inline' }}
      ref={modalRef}
    >
      <form className="form form__group">
        <h2 className="heading-secondary ma-bt-md">
          {selectedReview && selectedReview.tour.name}
        </h2>
        <h3>
          Review written on:{' '}
          {new Date(selectedReview && selectedReview.createdAt).toLocaleDateString()}
        </h3>
        <label className="form__label">My Review:</label>
        <div>{ReviewStars()}</div>
        <textarea
          id="review-text-edit"
          value={reviewText}
          onChange={(e) => handleTextChange(e)}
        ></textarea>
      </form>
      <button
        className="btn btn--green"
        onClick={() => {
          setEditedRating(selectedReview?.rating)
          handleModalChange();
        }}
      >
        Close
      </button>
      <button onClick={(e) => handleReviewSubmit(e)} className="btn btn--green">
        Save Review
      </button>
    </div>
  );
}
