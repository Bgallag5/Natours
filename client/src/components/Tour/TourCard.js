import React , {useEffect, useContext} from 'react';
import axios from 'axios';

import { GlobalContext } from '../../App';

export default function TourCard({tour}) {

  const { selectedTour, setSelectedTour } = useContext(GlobalContext);

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

  let nextTour;

  function calcNextStartDate(datesArr) {
    let today = new Date(Date.now());
    //loop over startDates and return the next most upcoming date
    for (let i = 0; i < datesArr.length; i++) {
      let date = new Date(datesArr[i]);
      if (today < date) {
        nextTour = date.toDateString().split(' ');
        return nextTour;
      }
    }
    return nextTour = 'No Tours Scheduled';
  }

  // IIFE on app load: get startDates 
  (function(){
    calcNextStartDate(startDates)
  })();

  // const handleTourClick = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.id);
 
  //   setSelectedTourID(e.target.id);
  //   //navigate to tourDetails Page, _self opens in same window
  //   window.open('/tourDetails', "_self")
  // }

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay"></div>
          <img className="card__picture-img" src={`/img/tours/${imageCover}`} alt="Tour"></img>
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
          {typeof(nextTour) === 'string' ? <span>{"No tours planned"}</span> : <span>{nextTour[1]} {nextTour[3]} </span>}
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
          <span className="card__footer-value">${price}</span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{ratingsAverage.toFixed(1)}</span>
          <span className="card__footer-text">{` rating (${ratingsQuantity})`}</span>
        </p>
        <a 
        className="btn btn--green btn--small" 
        href={`/tour/${tour.slug}`}
        // id={_id}
        // onClick={() => setSelectedTourID(_id)}
        >
          Details
        </a>
      </div>
    </div>
  );
}


