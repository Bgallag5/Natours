export const calcNextStartDate = (datesArr) => {
  let nextTour;
  let today = new Date(Date.now());
  //loop over startDates and return the next most upcoming date
  for (let i = 0; i < datesArr.length; i++) {
    let date = new Date(datesArr[i]);
    if (today < date) {
      nextTour = date.toDateString().split(" ");
      return nextTour;
    }
  }
  return (nextTour = "No Tours Scheduled");
};

export const calcStars = (reviewArr) => {
  reviewArr.forEach((review) => {
    let num = Math.round(review.rating);
    review.numberStars = [];
    for (let i = 0; i < num; i++) {
      review.numberStars.push("star");
    }
  });
  return reviewArr;
};

export const formatDate = (dateStr) => {
  console.log(dateStr);
  // let formatted = new Date(dateStr).toDateString()
  let formatted = new Date(dateStr).toLocaleDateString();
  console.log(formatted);
  return formatted;
};

// calcStars -
// take in decimal
// convert to whole number
// return 5 stars, filled to num
export const buildStars = (rating, classNames) => {
  let num = Math.round(rating)
  let stars = [];
  let classes = classNames ? classNames : ''

  for (let i = 1; i < 6; i++){
    if (num >= i){
      stars.push(
        <i key={i} className={`reviews__star reviews__star--active ${classes}`}>
          <span className="material-icons">star</span>
        </i>
      );
    } else if (num < i){
      stars.push(
        <i key={i} className={`reviews__star ${classes}`}>
          <span className="material-icons">star</span>
        </i>
      );
    }
  }
  return stars;
};

//BAD - redo, cannot push these elements to state!! useEffect and build them separately
//build array of stars based on rating
// const createStars = (reviews) => {
//   reviews.map((review) => {
//     let num = Math.round(review.rating);
//     review.stars = [];
//     //push 5 stars active/inactive based on user rating
//     for (let i = 1; i < 6; i++) {
//       if (i <= num) {
//         review.stars.push(
//           <i key={i} className="reviews__star reviews__star--active">
//             <span className="material-icons">star</span>
//           </i>
//         );
//       } else if (i > num) {
//         review.stars.push(
//           <i key={i} className="reviews__star reviews__star--inactive">
//             <span className="material-icons">star</span>
//           </i>
//         );
//       }
//     }
//   });
// };
