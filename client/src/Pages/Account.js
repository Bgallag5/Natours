import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../App';

import Settings from '../components/Account/Settings';
import Reviews from '../components/Account/Reviews';
import Modal from '../components/Account/Modal';

export default function Account() {
  const { currentUser } = useContext(GlobalContext);
  const [page, setPage] = useState('settings');

  const userViewRef = useRef();

  const [modalState, toggleModalState] = useState(false);
  const [selectedReview, setSelectedReview] = useState('');
  const [reviewText, setReviewText] = useState('');
  
  const handleClickReview = (review) => {
    setSelectedReview(review);
    setReviewText(review.review);
    handleModalChange();
  };

  function handleModalChange() {
    toggleModalState(prev => !prev);
    userViewRef.current.classList.toggle('is-blurred');
  }

  function handleTextChange(e) {
    e.preventDefault();
    setReviewText(e.target.value);
  }

  const modalProps = {
    selectedReview,
    reviewText,
    modalState,
    handleTextChange,
    handleModalChange,
    toggleModalState
  }

  return (
    <>
    <div ref={userViewRef} className="user-view">
      <nav className="user-view__menu">
        <ul className="side-nav">
          <li className={page === 'settings' ? 'side-nav--active' : ''}>
            <label onClick={() => setPage('settings')}>
              <i className="heading-box__icon">
                <span className="material-icons">settings</span>
              </i>
              Settings
            </label>
          </li>
          {/* <li>
              <label onClick={() => setPage('bookings')}>
                <i className="heading-box__icon">
                  <span className="material-icons">settings</span>
                </i>
                My Bookings
              </label>
            </li> */}
          <li className={page === 'reviews' ? 'side-nav--active' : ''}>
            <label onClick={() => setPage('reviews')}>
              <i className="heading-box__icon">
                <span className="material-icons">settings</span>
              </i>
              My Reviews
            </label>
          </li>
        </ul>
      </nav>
      <div className="user-view__content">
        <Settings page={page} />
        <Reviews page={page} userViewRef={userViewRef} handleClickReview={handleClickReview} />
      </div>
      </div>
      <Modal props={modalProps}/>
      </>
  );
}
