export const calcNextStartDate = (datesArr) => {
  // console.log(datesArr);
  let nextTour;
  let today = new Date(Date.now());
  //loop over startDates and return the next most upcoming date
  for (let i = 0; i < datesArr.length; i++) {
    let date = new Date(datesArr[i]);
    if (today < date) {
      nextTour = date.toDateString().split(' ');
      return nextTour;
    }
  }
  return (nextTour = 'No Tours Scheduled');
};

export const calcStars = (reviewArr) => {
  reviewArr.forEach(review => {
    let num = Math.round(review.rating);
    review.numberStars = [];
    for (let i = 0; i < num; i++) {
      review.numberStars.push('star');
    }
  });
  return reviewArr;
};