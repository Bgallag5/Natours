import React, { useEffect, useRef } from "react";
import axios from "axios";
import { SET_REVIEWS } from "../../GlobalStore/actions";
import { useDispatch, useSelector } from "react-redux";
import { calcStars } from "../../utils/helpers";

export default function TourReviews({ selectedTour }) {
  const state = useSelector((state) => state);
  const { reviews } = state;
  const dispatch = useDispatch();
  console.log(state);

  //reference to the current slide
  const currentSlide = useRef(0);
  const currentDot = useRef(0);

  //always set current dot to current slide
  useEffect(() => {
    currentDot.current = currentSlide.current;
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //axios request get reviews
  const getReviewData = async () => {
    try {
      const response = await axios.get(
        `/api/v1/tours/${selectedTour._id}/reviews`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: SET_REVIEWS, payload: response.data.data.document });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //call getReviewData when its callback triggers
  useEffect(() => {
    getReviewData();
  }, []);

  useEffect(() => {
    //add slider functionality
    reviews && buildSliderFunctionality();
  }, [reviews]);

  //BAD - redo, cannot push these elements to state!! useEffect and build them separately
  //build array of stars based on rating
  const createStars = (reviews) => {
    reviews.map((review) => {
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

  // review stars
  // if (reviews) {
  //   createStars(reviews);
  // }

  let slides;
  let buttons;
  let dotContainer;

  //position slides with TransformX
  const positionSlides = function () {
    slides?.forEach((slide, i) => {
      slide.style.transform = `translateX(${
        100 * (i - currentSlide.current)
      }%)`;
    });
  };

  const createDots = function () {
    //clear dots html
    dotContainer.innerHTML = "";
    slides.forEach(function (slide, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot ${
          currentSlide.current === i ? "dots__dot--active" : ""
        }" data-slide="${i}"></button>`
      );
    });
    dotContainer
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.addEventListener("click", handleDotClick));
  };

  const handleDotClick = function () {
    currentDot.current = this.dataset.slide;
    currentSlide.current = Number(this.dataset.slide);
    positionSlides();
    createDots();
  };

  const buildSliderFunctionality = () => {
    slides = document.querySelectorAll(".slide");
    buttons = document.querySelectorAll(".slider__btn");
    dotContainer = document.querySelector(".dots");
    positionSlides();
    createDots();

    // buttons?.forEach((button) => {
    //   button.addEventListener("click", sliderNavigation);
    // });
    // //remove eventListener
    // buttons?.forEach((button) => {
    //   return () => button.removeEventListener("click", sliderNavigation);
    // });
  };

  const sliderNavigation = (e) => {
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
    createDots();
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
                  {review.stars?.map((star, i) => {
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
        <button onClick={(e) => sliderNavigation(e)} data-direction="left" className="slider__btn slider__btn--left">
          &larr;
        </button>
        <button
        onClick={(e) => sliderNavigation(e)} 
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
