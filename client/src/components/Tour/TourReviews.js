import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";


export default function TourReviews({ selectedTour }) {
  const [reviews, setReviews] = useState("");
  //current slide ref
  const currentSlide = useRef(0);

  //axios request get reviews
  const getReviewData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/v1/tours/${selectedTour._id}/reviews`
      );
      console.log(response);   
      setReviews(response.data.data.document);
    } catch (err) {
      console.log(err);
    }
  }, [selectedTour]);

  //call getReviewData when its callback triggers
  useEffect(() => {
    getReviewData();
  }, [getReviewData]);

  const calcStars = (reviewArr) => {
    reviewArr.forEach((review) => {
      let num = Math.round(review.rating);
      review.numberStars = [];
      for (let i = 0; i < num; i++) {
        review.numberStars.push("star");
      }
    });
    return reviewArr;
  };

  //build array of stars based on rating
  const createStars = () => {
    reviews.forEach((review) => {
      let num = Math.round(review.rating);
      review.stars = [];
      //push 5 stars active/inactive based on user rating
      for (let i = 1; i < 6; i++) {
        if (i <= num) {
          review.stars.push(
            <i key={i} className="reviews__star reviews__star--active">
              <span className="material-icons">star</span>
            </i>
          );
        } else if (i > num) {
          review.stars.push(
            <i key={i} className="reviews__star reviews__star--inactive">
              <span className="material-icons">star</span>
            </i>
          );
        }
      }
    });
  };

  //review stars
  if (reviews) {
    createStars(reviews);
  }

  //add slider functionality
  useEffect(() => {
    reviews && buildSliderFunctionality();
  }, [reviews]);

  const buildSliderFunctionality = () => {
    const slides = document.querySelectorAll(".slide");
    const buttons = document.querySelectorAll(".slider__btn");
    // console.log(slides);

    //position slides with TransformX
    const positionSlides = function () {
      slides?.forEach((slide, i) => {
        slide.style.transform = `translateX(${
          100 * (i - currentSlide.current)
        }%)`;
      });
    };
    positionSlides();
    buttons?.forEach((button) => {
      button.addEventListener("click", (e) => {
        //set currentSlide ref
        const offset = e.target.dataset.direction === "right" ? 1 : -1;
        if (currentSlide.current === 0 && offset === -1) {
          console.log("NOWHERE OT GO LEFT");
          return;
        }
        if (currentSlide.current === slides.length - 1 && offset === 1) {
          console.log("NOWHERE OT GO RIGHT");
          return;
        }
        currentSlide.current = currentSlide.current + offset;
        positionSlides();
      });
    });
  };

  return (
    <section className="section-reviews">
      <div className="slider">
        {reviews &&
          reviews.map((review, i) => {
            return (
              <div
                key={review.id}
                className={`slide slide--${i} ${i === 4 ? "" : ""}`}
              >
                <div className="stars__container">
                  {review.stars.map((star, i) => {
                    return star;
                  })}
                </div>
                <div className="testimonial">
                  <blockquote className="testimonial__text">
                    {`"  `}
                    {review.review}
                    {`  "`}
                  </blockquote>
                  <address className="testimonial__author">
                    <img
                      src={
                        review.user.photo
                          ? `/img/users/${review.user.photo}`
                          : "/img/users/default.jpg"
                      }
                      alt="user"
                      className="testimonial__photo"
                    />
                    <h6 className="testimonial__name">{review.user.name}</h6>
                    <p className="testimonial__location">San Francisco, USA</p>
                  </address>
                </div>
              </div>
            );
          })}
        <button data-direction="left" className="slider__btn slider__btn--left">
          &larr;
        </button>
        <button
          data-direction="right"
          className="slider__btn slider__btn--right"
        >
          &rarr;
        </button>
        <div className="dots"></div>
      </div>
    </section>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="slider">
<div className="slide slide--1">
  <div className="testimonial">
    <h5 className="testimonial__header">Best financial decision ever!</h5>
    <blockquote className="testimonial__text">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Accusantium quas quisquam non? Quas voluptate nulla minima
      deleniti optio ullam nesciunt, numquam corporis et asperiores
      laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus
      id alias reiciendis, perferendis facere pariatur dolore veniam
      autem esse non voluptatem saepe provident nihil molestiae.
    </blockquote>
    <address className="testimonial__author">
      <img src={require("../img/user-1.jpg")} alt="" className="testimonial__photo" />
      <h6 className="testimonial__name">Aarav Lynn</h6>
      <p className="testimonial__location">San Francisco, USA</p>
    </address>
  </div>
</div> */
}

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="reviews">
        {reviews &&
          reviews.map((review) => {
            return (
              <div key={review.id} className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    className="reviews__avatar-img"
                    src={
                      review.user.photo
                        ? `/img/users/${review.user.photo}`
                        : '/img/users/default.jpg'
                    }
                    alt={review.user.name}
                  />
                  <h6 className="reviews__user">{review.user.name}</h6>
                </div>
                <p className="reviews__text">{review.review}</p>
                <div className="reviews__rating">
                  {review.numberStars.map((star) => {
                    return (
                      <i
                        key={Math.random() * 100}
                        className="reviews__star reviews__star--active"
                      >
                        <span className="material-icons">star</span>
                      </i>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div> */
}
