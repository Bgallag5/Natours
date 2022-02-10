import React from 'react';

export default function TourPhotos({ selectedTour }) {
  const { images } = selectedTour;

  let i = 0;
  return (
    <section className="section-pictures">
      {images &&
        images.map((image) => {
          i++;
          return (
            <div key={image} className="picture-box">
              <img
                className={`picture-box__img picture-box__img--${i}`}
                src={`/img/tours/${image}`}
                alt="The Forest Hiker Tour 1"
              />
            </div>
          );
        })}
    </section>
  );
}
