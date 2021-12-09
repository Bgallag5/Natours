const { Schema, model } = require('mongoose');
const validator = require('validator');
const Tour = require('./Tours');
//built in node module for encryption

//review model: rating, createdAt, ref to Tour, ref to User

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be left empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a Tour!'],
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User!'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// QUERY MIDDLEWARE
// populate reviews with it's User's name and photo on find()
// path references a field on THIS model
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

//statics are static methods we can add to schemas
reviewSchema.statics.calcAverageRating = async function (tourId) {
  //use aggregation pipeline to calcAverageRating on this tour
  // match on tour - only aggregate reviews that match the id of the Tour we care about
  // group by _id (required); numRating = sum of documents (+1 per document); avgRating = avg of ratings
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  //check if the tour has any ratings; only need to find and update if we have stats to add
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(
      tourId,
      {
        ratingsAverage: stats[0].avgRating,
        ratingsQuantity: stats[0].numRating,
      },
      { new: true, runValidators: true }
    );
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
  // update tour with new numRating and avgRating
};

reviewSchema.post('save', function () {
  //'this' points to document being saved
  // to access "Review" model post save, use this.constructor; this.constructor = Model {Review}
  this.constructor.calcAverageRating(this.tour);
});

//findByIdAndUpdate
//findByIdAndDelete
//////////////////////////////////////////////////////////////////////
// to be able to run calcAverageRatings on UPDATE AND DELETE we must use this QUERY middleware, not document middleware...
// where we do not have access to the current document, instead we set this.doc in pre, then access this.doc in next post middleware 
//these two middlewares work together to update a review and then re calculate average
// 'this' keyword in query middleware is the current query
reviewSchema.pre(/^findOneAnd/, async function (next) {
  //mongoose 6.0 use .clone to re-execute a query
  //set 'this.doc' to our current document
  this.doc = await this.findOne().clone();
  console.log(this.doc);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); - doesnt work in post becuase the query has already been executed
  //use constructor to access 'Review' model
  await this.doc.constructor.calcAverageRating(this.doc.tour);
});
//////////////////////////////////////////////////////////////////////

const Review = model('Review', reviewSchema);

module.exports = Review;

//POST /tour/48y7tw02n/reviews
//GET /tour/48y7tw02n/reviews
//GET /tour/48y7tw02n/reviews/o9p47dns

// stats in calcAverageRating returns:
// [
//   {
//     _id: new ObjectId("61b1080c5176ad058545ad53"),
//     numRating: 13,
//     avgRating: 2.0923076923076924
//   }
// ]
