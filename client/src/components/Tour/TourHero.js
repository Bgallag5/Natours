import React from 'react';

export default function TourHero({selectedTour}) {


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
          {/* <svg className="heading-box__icon">
            <use xlink:href="/img/icons.svg#icon-clock"></use>
          </svg> */}
            <i className="heading-box__icon">
            <span className="material-icons">schedule</span>
          </i>
          <span className="heading-box__text">5 days</span>
        </div>
        <div className="heading-box__detail">
          {/* <svg className="heading-box__icon">
            <use xlink:href="/img/icons.svg#icon-map-pin"></use>
          </svg> */}
            <i className="heading-box__icon">
            <span className="material-icons">place</span>
          </i>
          <span className="heading-box__text">Banff, CAN</span>
        </div>
      </div>
    </div>
  </section>
  );
}
