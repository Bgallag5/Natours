const { Schema, model } = require('mongoose');
const validator = require('validator');
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
// populate reviews with data on find() 
// populate Review with it's User's name and photo
// path references a field on THIS model
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})


const Review = model('Review', reviewSchema);

module.exports = Review;

//POST /tour/48y7tw02n/reviews
//GET /tour/48y7tw02n/reviews
//GET /tour/48y7tw02n/reviews/o9p47dns