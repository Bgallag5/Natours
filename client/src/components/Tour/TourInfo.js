import React, { useEffect } from 'react';

import { calcNextStartDate } from '../../utils/helpers';

export default function TourInfo({ selectedTour }) {
  console.log(selectedTour);

  const {
    name,
    _id,
    difficulty,
    startLocation,
    ratingsAverage,
    ratingsQuantity,
    images,
    startDates,
    duration,
    guides,
    price,
    slug,
    maxGroupSize,
    summary,
    description,
    imageCover,
    locations,
    nextStartDate,
  } = selectedTour;

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <div className="overview-box__detail">
              <i className="overview-box__icon">
                <span className="material-icons">event</span>
              </i>
              <span className="overview-box__label">Next Date</span>
              <span className="overview-box__text">
                {nextStartDate[1]} {nextStartDate[3]}{' '}
              </span>
            </div>
            <div className="overview-box__detail">
              <i className="overview-box__icon">
                <span className="material-icons">swap_vert</span>
              </i>
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">{difficulty}</span>
            </div>
            <div className="overview-box__detail">
              <i className="overview-box__icon">
                <span className="material-icons">accessibility_new</span>
              </i>
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text"> {maxGroupSize} people</span>
            </div>
            <div className="overview-box__detail">
              <i className="overview-box__icon">
                <span className="material-icons">trending_up</span>
              </i>
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">{ratingsAverage.toFixed(1)} / 5</span>
            </div>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

            {guides &&
              guides.map((guide) => {
                  console.log(guide);
                return (
                  <div key={guide.id} className="overview-box__detail">
                    <img
                      className="overview-box__img"
                      src={`/img/users/${guide.photo}`}
                      alt={guide.name}
                    />
                    <span className="overview-box__label">{guide.role}</span>
                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About {name}</h2>
        <p className="description__text">{description}</p>
      </div>
    </section>
  );
}
