import React, { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useStoreContext } from "../../GlobalStore/GlobalStore";
import {SET_REVIEWS } from "../../GlobalStore/actions";

export default function TourReviews({ selectedTour }) {
  // const [reviews, setReviews] = useState("");
  const [{reviews}, dispatch] = useStoreContext();
  //reference to the current slide 
  const currentSlide = useRef(0);
  const currentDot = useRef(0);

  //always set current dot to current slide
  useEffect(() => {
    currentDot.current = currentSlide.current; 
  })

  //axios request get reviews
  const getReviewData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/v1/tours/${selectedTour._id}/reviews`
      );
      console.log(response);   
      // setReviews(response.data.data.document);
      dispatch({type: SET_REVIEWS, payload: response.data.data.document})
    } catch (err) {
      console.log(err);
    }
  }, [selectedTour]);

  //call getReviewData when its callback triggers
  useEffect(() => {
    getReviewData();
  }, [getReviewData]);

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
    const dotContainer = document.querySelector('.dots')

    //position slides with TransformX
    const positionSlides = function () {
      slides?.forEach((slide, i) => {
        slide.style.transform = `translateX(${
          100 * (i - currentSlide.current)
        }%)`;
      });
    };
    positionSlides();

    const handleDotClick = function(){
      console.log(this.dataset.slide);
      currentDot.current = this.dataset.slide;
      currentSlide.current = Number(this.dataset.slide);
      positionSlides();
      createDots();
    }

    const createDots = function () {
      //clear dots html
      dotContainer.innerHTML = '';
      slides.forEach(function (slide, i) {
        console.log(currentSlide.current);
        console.log(currentSlide.current === i);
        dotContainer.insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot ${currentSlide.current === i ? 'dots__dot--active' : ''}" data-slide="${i}"></button>`
        );
      });
      dotContainer.querySelectorAll('.dots__dot').forEach(dot => dot.addEventListener('click', handleDotClick))
    };

    createDots()

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
        createDots();
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
        <div className="dots">
        </div>
      </div>
    </section>
  );
}

