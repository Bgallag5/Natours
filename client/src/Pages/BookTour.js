import React, { useEffect, useContext, useState } from 'react';

import { GlobalContext } from '../App';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export default function BookTour() {
  // const { currentUser } = useContext(GlobalContext);
  // const [currentTour, setCurrentTour] = useState('');
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const {selectedTour, currentUser} = state;

  // const loadTourData = async () => {
  //   // /tour/the-snow-adventurer/book
  //   let tourSlug = window.location.pathname.split('/')[2];

  //   try {
  //     const res = await axios({
  //       method: 'GET',
  //       url: `/api/v1/tours`,
  //       params: {
  //         slug: tourSlug,
  //       },
  //     });
  //     if (res.status === 200) {
  //       // showAlert('success', 'Logged in successfully!');
  //       // setCurrentTour(res.data.data.document[0]);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await axios({
         method: 'POST',
         url: `/api/v1/bookings`,
         data: {
          //  email
          //  price
         }
       }) 
    } catch (err) {
       console.log(err); 
    }
  }

  useEffect(() => {
    // loadTourData();
  }, [])

  return (
    selectedTour && (
      <div className="container booker">
        <div className="booking-info">
          <div className="tour-booking-header">
            <h1>{selectedTour.name}</h1>
            <h1>${selectedTour.price}</h1>
          </div>
          <div className="tour-booking-img">
            <img className="card__picture-img" src={`/img/tours/${selectedTour.imageCover}`} alt="selected tour"></img>
            {/* <p>{currentTour.summary}</p> */}
          </div>
        </div>
        <div className="booking-submit">
          <form onSubmit={handleBookSubmit} className="form form-user-data">
            <div className="form__group">
              <label className="form__label">Your Email</label>
              <input className="form__input" placeholder={currentUser.email} />
            </div>
            <div className="form__group tour-payment-submit">
              <label className="form__label">
                How many people in your group?
              </label>
              <input className="form__input" type="number" />
            </div>
            <div className="form__group">
              <button type="submit" className="btn btn-small btn-green">
                Book Tour
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
