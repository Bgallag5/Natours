import React, { useRef } from 'react';
import axios from 'axios';

export default function Modal({ props }) {
  const {
    selectedReview,
    reviewText,
    modalState,
    handleTextChange,
    handleModalChange,
  } = props;

  const modalRef = useRef();

  async function handleReviewSubmit(e) {
    e.preventDefault();
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
      if (res.statusText === 'OK') {
        //alert
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

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
        <h3>Review written on: {new Date(selectedReview.createdAt).toLocaleDateString()}</h3>
        <label className="form__label">My Review:</label>
        <textarea
          id="review-text-edit"
          value={reviewText}
          onChange={(e) => handleTextChange(e)}
        ></textarea>
      </form>
      <button
        className="btn btn--green"
        onClick={() => {
          handleModalChange();
        }}
      >
        Close
      </button>
      <button
        onClick={(e) => handleReviewSubmit(e)}
        className="btn btn--green"
      >
        Save Review
      </button>
    </div>
  );
}
