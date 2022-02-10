import React from 'react';

export default function TourPhotos() {
  return (
    <section className="section-pictures">
    <div className="picture-box">
      <img
        className="picture-box__img picture-box__img--1"
        src="/img/tours/tour-1-1.jpg"
        alt="The Forest Hiker Tour 1"
      />
    </div>
    <div className="picture-box">
      <img
        className="picture-box__img picture-box__img--2"
        src="/img/tours/tour-1-2.jpg"
        alt="The Forest Hiker Tour 2"
      />
    </div>
    <div className="picture-box">
      <img
        className="picture-box__img picture-box__img--3"
        src="/img/tours/tour-1-3.jpg"
        alt="The Forest Hiker Tour 3"
      />
    </div>
  </section>
  );
}
