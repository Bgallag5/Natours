import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import TourHero from "../components/Tour/TourHero";
import TourInfo from "../components/Tour/TourInfo";
import TourPhotos from "../components/Tour/TourPhotos";
import TourReviews from "../components/Tour/TourReviews";
import { calcNextStartDate } from "../utils/helpers";

import { SET_SELECTED_TOUR } from "../GlobalStore/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function TourDetails() {
  
  const {selectedTour, tours} = useSelector(state => state);
  const dispatch = useDispatch();

console.log(tours);

  const getDetails = async () => {
    const currentSlug = window.location.href.split("/").pop();
    const currentTour = tours.find(el => {
     return el.slug === currentSlug
    })
    console.log(currentTour);
    dispatch({type: SET_SELECTED_TOUR, payload: currentTour})
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {selectedTour && (
        <>
          <TourHero selectedTour={selectedTour} />
          <TourInfo selectedTour={selectedTour} />
          <TourPhotos selectedTour={selectedTour} />
          <TourReviews selectedTour={selectedTour} />
          <section className="section-cta">
            <div className="cta">
              <div className="cta__img cta__img--logo">
                <img src="/img/logo-white.png" alt="Natours logo" />
              </div>
              <img
                className="cta__img cta__img--1"
                src="/img/tours/tour-1-2.jpg"
                alt="Tour"
              />
              <img
                className="cta__img cta__img--2"
                src="/img/tours/tour-1-3.jpg"
                alt="Tour"
              />
              <div className="cta__content">
                <h2 className="heading-secondary">What are you waiting for?</h2>
                <p className="cta__text">
                  5 days. 1 adventure. Infinite memories. Make it yours today!
                </p>
                <Link
                  className="btn btn--green span-all-rows"
                  to={`/tour/${selectedTour.slug}/book`}
                >
                  Book this Tour
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
