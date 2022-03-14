import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TourHero from '../components/Tour/TourHero';
import TourInfo from '../components/Tour/TourInfo';
import TourPhotos from '../components/Tour/TourPhotos';
import TourReviews from '../components/Tour/TourReviews';

import { calcNextStartDate } from '../utils/helpers';

import { GlobalContext } from '../App';
import axios from 'axios';

export default function TourDetails() {
  const { selectedTour, setSelectedTour } = useContext(GlobalContext);

  const getDetails = async () => {
    const currentSlug = window.location.href.split('/').pop();
    const currentTour = await axios.get(`http://localhost:3001/api/v1/tours`, {
      params: { slug: currentSlug },
    }); // /${id}
    currentTour.data.data.document[0].nextStartDate = calcNextStartDate(
      currentTour.data.data.document[0].startDates
    );
    setSelectedTour({ ...currentTour.data.data.document[0] });
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
                <a
                  className="btn btn--green span-all-rows"
                  href={`/tour/${selectedTour.slug}/book`}
                >
                  Book this Tour
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
