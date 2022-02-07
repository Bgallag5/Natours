import React from 'react';

export default function TourCard() {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nspb;</div>
          <img className="card__picture-img" src="/" alt="Tour"></img>
        </div>
        <h3 class="heading-tertirary">
          <span>The Sea Explorer</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">medium 7-day tour</h4>
        <p className="card__text">
          Exploring the jaw-dropping US east coast by foot and by boat
        </p>
        <div className="card__data">
          <i className='card__icon '>
            <span className='material-icons'>place</span>
          </i>
          <span>Reston, Virginia</span>
        </div>
        <div className="card__data">
          <i className='card__icon '>
            <span className='material-icons'>date_range</span>
          </i>
          <span>August 9-11</span>
        </div>
        <div className="card__data">
          <i className='card__icon '>
            <span className='material-icons'>outlined_flag</span>
          </i>
          <span>2 Stops</span>
        </div>
        <div className="card__data">
          <i className='card__icon '>
            <span className='material-icons'>perm_identity</span>
          </i>
          <span>10 People</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">$</span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">4.8</span>
          <span className="card__footer-text">rating (20)</span>
        </p>
        <a className="btn btn--green btn--small" href="/tour">
          Details
        </a>
      </div>
    </div>
  );
}
