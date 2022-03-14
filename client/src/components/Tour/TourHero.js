import React from 'react';

export default function TourHero({selectedTour}) {

  const {type, coordinate, address, description} = selectedTour.startLocation;
  console.log(selectedTour);

  return (
    <section className="section-header">
    <div className="header__hero">
      <div className="header__hero-overlay">&nbsp;</div>
      <img
        className="header__hero-img"
        src="/img/tours/tour-1-cover.jpg"
        alt="The Forest Hiker"
      />
    </div>
    <div className="heading-box">
      <h1 className="heading-primary"><span>{selectedTour.name}</span></h1>
      <div className="heading-box__group">
        <div className="heading-box__detail">
            <i className="heading-box__icon">
            <span className="material-icons">schedule</span>
          </i>
          <span className="heading-box__text">{selectedTour.duration} Days</span>
        </div>
        <div className="heading-box__detail">
            <i className="heading-box__icon">
            <span className="material-icons">place</span>
          </i>
          <span className="heading-box__text">{selectedTour.startLocation.description}</span>
        </div>
      </div>
    </div>
  </section>
  );
}
