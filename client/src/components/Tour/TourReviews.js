import React, { useEffect, useRef } from "react";
import axios from "axios";
import { SET_REVIEWS } from "../../GlobalStore/actions";
import { useDispatch, useSelector } from "react-redux";
import { buildStars } from "../../utils/helpers";

export default function TourReviews({ selectedTour }) {
  const state = useSelector((state) => state);
  const { reviews } = state;
  const dispatch = useDispatch();

  //DOM elements
  //reference to the current slide
  const currentSlide = useRef(0);
  const currentDot = useRef(0);
  const slides = useRef();
  const dotContainer = useRef();

  //always set current dot to current slide
  useEffect(() => {
    currentDot.current = currentSlide.current;
  });

  //axios request get reviews
  const getReviewData = async () => {
    try {
      const response = await axios.get(
        `/api/v1/tours/${selectedTour._id}/reviews`
      );
      if (response.status === 200) {
        dispatch({ type: SET_REVIEWS, payload: response.data.data.document });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //call getReviewData on mount
  useEffect(() => {
    getReviewData();
  }, []);

  const buildSliderFunctionality = () => {
    slides.current = document.querySelectorAll(".slide");
    dotContainer.current = document.querySelector(".dots");
    positionSlides();
    createDots();
  };

  useEffect(() => {
    //add slider functionality
    reviews && buildSliderFunctionality();
  }, [reviews]);

  //position slides with TransformX
  const positionSlides = function () {
    slides.current?.forEach((slide, i) => {
      slide.style.transform = `translateX(${
        100 * (i - currentSlide.current)
      }%)`;
    });
  };

  //build slider dots
  const createDots = function () {
    //clear dots html
    dotContainer.current.innerHTML = "";
    slides.current.forEach(function (slide, i) {
      dotContainer.current.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot ${
          currentSlide.current === i ? "dots__dot--active" : ""
        }" data-slide="${i}"></button>`
      );
    });
    dotContainer.current
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.addEventListener("click", handleDotClick));
  };

  //click on a dot navigates to that review
  const handleDotClick = function () {
    currentDot.current = this.dataset.slide;
    currentSlide.current = Number(this.dataset.slide);
    positionSlides();
    createDots();
  };

  //arrow button clicks move the slider right/left
  const sliderNavigation = (e) => {
    //offset +1/-1 based on direction
    const offset = e.target.dataset.direction === "right" ? 1 : -1;
    // can't navigate beyond length or reviews arr
    if (currentSlide.current === 0 && offset === -1) {
      return;
    }
    if (currentSlide.current === slides.current.length - 1 && offset === 1) {
      return;
    }
    //set currentSlide.current based on button direction
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
                  {buildStars(review.rating)}
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
        <button
          onClick={(e) => sliderNavigation(e)}
          data-direction="left"
          className="slider__btn slider__btn--left"
        >
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
