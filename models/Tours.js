const { Schema, model } = require('mongoose');
const slugify = require('slugify');
const { isAlpha } = require('validator');

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'you must provide a name'],
      maxlength: [80, 'Tour name must be less than 80 characters'],
      minlength: [10, 'Tour name have more than 10 characters'],
      unique: true,
      trim: true,
      //isAlpha checks if string is only alphabet charcters
      // validate: [validator.isAlpha, 'Tour name can only be letters'],
    },
    duration: {
      type: Number,
      required: [true, 'Tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Must include a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Must include a difficulty'],
      //enum validator specifies allowed values (only strings)
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficult must be easy, medium, or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 5,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating cant be higher than 10'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Must have a price'],
    },
    discount: {
      type: Number,
      validate: {
        validator: function (val) {
          //return true/false via comparison
          // can only use this keyword in validator when creating NEW documents
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be less than price',
      },
    },
    summary: {
      type: String,
      maxLength: 250,
      trim: true,
      required: [true, 'Must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Must have an image'],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
    },
    slug: {
      type: String,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      //Geo-Json
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{
      type: Schema.ObjectId,
      ref: "User"
    }]
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

//use function keyword to have access to 'this' as a ref to Tour obj
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Virtual populate 
// connect the 'tour' field on 'Review' to the _id field on this model (Tour)
// virtuals keep a reference to the child documents without storing that data in the DB
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: "_id"
});

//DOCUMENT MIDDLEWARE - runs before .save() and .create() commands, but NOT .update()
// 'this' here refers to the current document trying to be saved or created
// slug - string we can add to URL
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//post middleware happens after the pre middleware has completed
// we have a finished document after pre - document replaces 'this' keyword
tourSchema.post('save', function (document, next) {
  console.log(document);
  next();
});

// // get guides by their ID's
// tourSchema.pre('save', async function(next){
//   // .map() over this.guides - await User.find - return Array of promises 
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   // .resolve promises before assignment to this.guides 
//   this.guides = await Promise.all(guidesPromises)
//   next();
// })


// QUERY MIDDLEWARE
//on the 'find' hook the 'this' keyword refers to the QUERY NOT the OBJECT
// regex /^find/ catches ALL find methods: find(), findOne(), findById()
// filter out the secret tours using query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

//Query middleware - all find queries will populate the guides field 
tourSchema.pre(/^find/, function(next){
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
})

tourSchema.post(/^find/, function (docs, next) {
  // log the time it takes to execute
  console.log(`Query took ${Date.now() - this.start} milliseconds to run`);
  next();
});

//AGGREGATION MIDDLEWARE
// aggregate middleware - 'this' points to current aggregation object
//access our .aggregate() pipeline with this.pipeline()
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

module.exports = model('Tour', tourSchema);
