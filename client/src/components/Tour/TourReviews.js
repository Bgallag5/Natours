import React from 'react';

export default function TourReviews() {
  return (
    <section className="section-reviews">
      <div className="reviews">
        <div className="reviews__card">
          <div className="reviews__avatar">
            <img
              className="reviews__avatar-img"
              src="/img/users/user-4.jpg"
              alt="Ayla Cornell"
            />
            <h6 className="reviews__user">Ayla Cornell</h6>
          </div>
          <p className="reviews__text">
            Porttitor ullamcorper rutrum semper proin mus felis varius convallis
            conubia nisl erat lectus eget.
          </p>
          <div className="reviews__rating">
            {/* <svg className="reviews__star reviews__star--active">
            <use xlink:href="/img/icons.svg#icon-star"></use>
          </svg>
          <svg className="reviews__star reviews__star--active">
            <use xlink:href="/img/icons.svg#icon-star"></use>
          </svg>
          <svg className="reviews__star reviews__star--active">
            <use xlink:href="/img/icons.svg#icon-star"></use>
          </svg>
          <svg className="reviews__star reviews__star--active">
            <use xlink:href="/img/icons.svg#icon-star"></use>
          </svg>
          <svg className="reviews__star reviews__star--active">
            <use xlink:href="/img/icons.svg#icon-star"></use>
          </svg> */}
            <i className="reviews__star reviews__star--active">
              <span className="material-icons">star</span>
            </i>
            <i className="reviews__star reviews__star--active">
              <span className="material-icons">star</span>
            </i>
            <i className="reviews__star reviews__star--active">
              <span className="material-icons">star</span>
            </i>
            <i className="reviews__star reviews__star--active">
              <span className="material-icons">star</span>
            </i>
            <i className="reviews__star">
              <span className="material-icons">star</span>
            </i>
          </div>
        </div>
      </div>
    </section>
  );
}
