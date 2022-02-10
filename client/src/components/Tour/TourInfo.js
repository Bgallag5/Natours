import React from 'react';

export default function TourInfo() {
  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <div className="overview-box__detail">
              {/* <svg className="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-icon"></use>
              </svg> */}
              <i className="overview-box__icon">
              <span className="material-icons">place</span>
            </i>
              <span className="overview-box__label">Next Date</span
              ><span className="overview-box__text">April 2021</span>
            </div>
            <div className="overview-box__detail">
              {/* <svg className="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-trending-up"></use>
              </svg> */}
              <i className="overview-box__icon">
              <span className="material-icons">place</span>
            </i>
              <span className="overview-box__label">Difficulty</span>
              <span className="overview-box__text">easy</span>
            </div>
            <div className="overview-box__detail">
              {/* <svg className="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-icon-user"></use>
              </svg> */}
              <i className="overview-box__icon">
              <span className="material-icons">place</span>
            </i>
              <span className="overview-box__label">Participants</span>
              <span className="overview-box__text">25 people</span>
            </div>
            <div className="overview-box__detail">
              {/* <svg className="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-icon-star"></use>
              </svg> */}
              <i className="overview-box__icon">
              <span className="material-icons">place</span>
            </i>
              <span className="overview-box__label">Rating</span>
              <span className="overview-box__text">undefined / 5</span>
            </div>
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            <div className="overview-box__detail">
              <img
                className="overview-box__img"
                src="/img/users/user-10.jpg"
                alt="Steve T. Scaife"
              /><span className="overview-box__label">Lead guide</span
              ><span className="overview-box__text">Steve T. Scaife</span>
            </div>
            <div className="overview-box__detail">
              <img
                className="overview-box__img"
                src="/img/users/user-7.jpg"
                alt="Kate Morrison"
              /><span className="overview-box__label">Tour guide</span
              ><span className="overview-box__text">Kate Morrison</span>
            </div>
            <div className="overview-box__detail">
              <img
                className="overview-box__img"
                src="/img/users/user-5c8a1f292f8fb814b56fa184-1610866898764.jpeg"
                alt="Leo J. Gillespie"
              /><span className="overview-box__label">Tour guide</span
              ><span className="overview-box__text">Leo J. Gillespie</span>
            </div>
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About The Forest Hiker tour</h2>
        <p className="description__text">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p className="description__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
    </section>
  );
}
