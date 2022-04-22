import React from 'react';
import { calcNextStartDate } from '../../utils/helpers';
// import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function TourCard({ tour }) {
  
  // const state = useSelector(state => state);
  // const dispatch = useDispatch();

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
  } = tour;

  const nextTour = calcNextStartDate(startDates);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay"></div>
          <img
            className="card__picture-img"
            src={`/img/tours/${imageCover}`}
            alt="Tour"
          ></img>
        </div>
        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {difficulty} {duration}-day tour
        </h4>
        <p className="card__text">{summary}</p>
        <div className="card__data">
          <i className="card__icon ">
            <span className="material-icons">place</span>
          </i>
          <span>{startLocation.description}</span>
        </div>
        <div className="card__data">
          <i className="card__icon ">
            <span className="material-icons">date_range</span>
          </i>
          {typeof nextTour === 'string' ? (
            <span>{'No tours planned'}</span>
          ) : (
            <span>
              {nextTour[1]} {nextTour[3]}{' '}
            </span>
          )}
        </div>
        <div className="card__data">
          <i className="card__icon ">
            <span className="material-icons">outlined_flag</span>
          </i>
          <span>{locations.length} Stops</span>
        </div>
        <div className="card__data">
          <i className="card__icon ">
            <span className="material-icons">perm_identity</span>
          </i>
          <span>{maxGroupSize} People</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${price} </span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">
            {ratingsAverage.toFixed(1)}
          </span>
          <span className="card__footer-text">{` rating (${ratingsQuantity})`}</span>
        </p>
        <Link
          className="btn btn--green btn--small"
          to={`/tour/${tour.slug}`}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
