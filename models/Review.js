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
  // update tour with new numRating and avgRating
  await Tour.findByIdAndUpdate(
    tourId,
    { ratingsAverage: stats[0].avgRating, ratingsQuantity: stats[0].numRating },
    { new: true, runValidators: true }
  );
};

reviewSchema.post('save', function () {
  //'this' points to document being saved
  // to access "Review" model before save, use this.constructor; this.constructor = Model {Review}
  this.constructor.calcAverageRating(this.tour);
});

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
