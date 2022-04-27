import React, { useState, useRef, useEffect } from 'react';
import Settings from '../components/Account/Settings';
import Reviews from '../components/Account/Reviews';
import Modal from '../components/Account/Modal';

import { useDispatch, useSelector } from "react-redux";
import { SET_ACCOUNT_PAGE, SET_SELECTED_REVIEW } from '../GlobalStore/actions';

export default function Account() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const {currentUser, selectedReview, page} = state;

  const userViewRef = useRef();
  
  //component level state
  const [modalState, toggleModalState] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleClickReview = (review) => {
    dispatch({type: SET_SELECTED_REVIEW, payload: review})
    setReviewText(review.review);
    handleModalChange();
  };

  function handleModalChange() {
    toggleModalState((prev) => !prev);
    userViewRef.current.classList.toggle('is-blurred');
  }

  function handleTextChange(e) {
    e.preventDefault();
    setReviewText(e.target.value);
  }

  //set current account page (tab) 
  function setPage (pageTitle) {
    dispatch({type: SET_ACCOUNT_PAGE, payload: pageTitle})
  }

  const modalProps = {
    selectedReview,
    reviewText,
    modalState,
    handleTextChange,
    handleModalChange,
  };

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
          <Settings page={page} currentUser={currentUser} />
          <Reviews
            page={page}
            currentUser={currentUser}
            userViewRef={userViewRef}
            handleClickReview={handleClickReview}
          />
        </div>
      </div>
      <Modal props={modalProps} />
    </>
  );
}
