import React, { useEffect, useRef, useState } from "react";

import { GlobalContext } from "../App";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function BookTour() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { selectedTour, currentUser } = state;

  const [totalPrice, setTotalPrice] = useState(selectedTour.price)
  console.log(state.selectedTour);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: `/api/v1/bookings`,
        data: {
          //  email
          //  price
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeGroupSize = (e) => {
    console.log(e.target.value);
    console.log(Number(e.target.value));
    setTotalPrice( Number(e.target.value) * selectedTour.price)

  }

  return (
    selectedTour && (
      <div className="container booker">
        <div className="booking-info">
          <div className="booking-header">
            <h1>{selectedTour.name}</h1>
          </div>
          <div className="tour-booking-img">
            <img
              className="card__picture-img"
              src={`/img/tours/${selectedTour.imageCover}`}
              alt="selected tour"
            ></img>
          </div>
          <div className="tour--info">
            <div className="tour--info-about">
              <h2>Start Location: {selectedTour.startLocation.address}</h2>
              <h2>Maximun Group Size: {selectedTour.maxGroupSize}</h2>
              <h2>Difficulty: {selectedTour.difficulty}</h2>
            </div>
            <div className="tour--info-data">
              <div className="flex--row ">
              <h2>Select Date: </h2>
                <select className="ui search dropdown">
                  <option value="">Date</option>
                  {selectedTour.startDates.map((date) => {
                    const formatted = new Date(date).toDateString();
                    return <option value={new Date(date)}>{formatted} </option>;
                  })}
                </select>
              </div>

              <h2>Price per person: ${selectedTour.price}</h2>
              <h2>Total Price: ${totalPrice}</h2>
            </div>
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
              <input  placeholder={1} onChange={(e) => changeGroupSize(e)} className="form__input" type="number" />
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
