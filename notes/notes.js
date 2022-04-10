//QUERY HANDLING

//// 1: FILTERING
// console.log(req.query);
// //make copy of req.query via destructure req.query
// const queryObject = { ...req.query };
// //we don't want these fields in our queries
// const excludedFields = ['page', 'sort', 'limit', 'fields'];
// //remove unwanted fields from our copy of queryObject
// excludedFields.forEach((el) => delete queryObject[el]);

// //{ difficulty: 'medium', sort: '1', limit: '10' } => to this => { difficulty: 'medium' }
// // gte, gt, lte, lt (greater/less than || greater/less than or equal to)

// // ADVANCED FILTERING
// //regex to replace query params with Mongo query params (Mongo prefixes with a '$')
// let queryStr = JSON.stringify(queryObject);
// queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

// //find Tours that match query string
// let query = Tour.find(JSON.parse(queryStr));

// // 2: SORTING
// //if sort params => split each query param then sort by each param
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   //else sort by createdAt descending
//   query = query.sort('-createdAt');
// }

// // 3: FIELD LIMITING
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }

// // 4: PAGINATION
// // page=2&limit=10 page 1 1-10, page 2 11-20...
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = page * limit - limit;

// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   //.countDocuments - mongoose native returns # of docs in collection
//   const numTours = await Tour.countDocuments();
//   //prevent query from going outside limit of returned results
//   if (skip >= numTours) throw new Error('This page does not exist');
// }

//EXECUTE QUERY
//call the methods on the APIFeatures class - each method returns the object
//build 'query' object then send await query

// //mongoose built in filter methods
// const query = await Tour.find()
//   .where('duration')
//   .equals(5)
//   .where('difficulty')
//   .equals('easy');

//MONGOOSE AGGREGATE - AGGREGATION PIPELINE
// .aggregate is used to generate stats from our db
// the _id field in the $group defines what we want to group by, the rest generate stats
exports.getTourStats = async (req, res) => {
  //.aggregate is mongoose native method - generate stats from our DB
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        //the _id field defines what they will be grouped by.
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      //sort now uses the field names we've declared above
      {
        $sort: { avgPrice: 1 },
      },
      //exclued the results with _id of 'easy'
      {
        $match: { _id: { $ne: 'easy' } },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//returns...
// {
//     "status": "success",
//     "data": {
//       "stats": [
//         {
//           "_id": "easy",
//           "numTours": 4,
//           "numRatings": 159,
//           "avgRating": 4.675,
//           "avgPrice": 1272,
//           "minPrice": 397,
//           "maxPrice": 1997
//         },
//         {
//           "_id": "medium",
//           "numTours": 3,
//           "numRatings": 70,
//           "avgRating": 4.8,
//           "avgPrice": 1663.6666666666667,
//           "minPrice": 497,
//           "maxPrice": 2997
//         },
//         {
//           "_id": "difficult",
//           "numTours": 2,
//           "numRatings": 41,
//           "avgRating": 4.6,
//           "avgPrice": 1997,
//           "minPrice": 997,
//           "maxPrice": 2997
//         }
//       ]
//     }
//   }



exports.getMonthlyPlan = async (req, res) => {
  try {
    // *1 to coerce into a string
    const year = req.params.year * 1; // 2021
    const plan = await Tour.aggregate([
      //$unwind - deconstructs an array field from a MongoDB document and output one document for each element of the array
      // for each start date => recreate entire object with just that start date
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          //match the start dates to gte/lte to the first and last of this year
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      //groups by start dates, calc number of tours starting, push name of tours to array (within the grroups they've been assigned)
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      //recreate _id field as month field for ease
      {
        $addFields: { month: '$_id' },
      },
      //declare fields to not show up with $project
      {
        $project: {
          _id: 0,
        },
      },
      //sort by num of tour starts descending
      {
        $sort: {
          numTourStarts: -1,
        },
      },
      //limit num of results returned
      {
        $limit: 10,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        results: plan.length,
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//returns...
// {
//   "status": "success",
//   "data": {
//     "results": 10,
//     "plan": [
//       {
//         "numTourStarts": 3,
//         "tours": [
//           "The Sea Explorer",
//           "The Forest Hiker",
//           "The Sports Lover"
//         ],
//         "month": 7
//       },
//       {
//         "numTourStarts": 2,
//         "tours": [
//           "The City Wanderer",
//           "The Star Gazer"
//         ],
//         "month": 3
//       },
//       ...so on


//QUERY MIDDLEWARE

// in Query Middleware, "THIS" keyword refers to the QUERY
//on the 'find' hook the 'this' keyword refers to the QUERY NOT the OBJECT
// regex /^find/ catches ALL find methods: find(), findOne(), findById()
// filter out the secret tours using query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// ADVANCED MONGOOSE MODELLING


//MongoDB REFERENCE
// On Tour Model - an array of guides for this tour, saved as an Array of...
// ObjectId's with reference the User model
guides: [{
  type: Schema.ObjectId,
  ref: "User"
}]

// then in Queries, use .populate() to specify what fields you want to include
// from the referenced model 
// get Tours, include 'guides', but omit __v and passwordChangedAt
const tour = await Tour.findById(req.params.id).populate({
  path: 'guides',
  select: '-__v -passwordChangedAt',
});

//Query middleware - all find queries will populate the guides field 
// this type of middleware is a good practice for populating data in MongoDB
tourSchema.pre(/^find/, function(next){
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
})

// // get guides by their ID's
// tourSchema.pre('save', async function(next){
//   // .map() over this.guides - await User.find - return Array of promises 
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   // .resolve promises before assignment to this.guides 
//   this.guides = await Promise.all(guidesPromises)
//   next();
// })


//AUTHENTICATION

const catchAsync = require("../utils/catchAsync");

//JSON Web Tokens

//payload - the data you want stored in your web token
// const token = jwt.sign(payload, secret, callback)
const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, {
  expiresIn: process.env.JWTEXPIRES,
});


//AUTH MIDDLEWARE - check tokens 
exports.auth = catchAsync(async (req, res, next) => {
  //const and let are block scoped - must let token outside of conditional
  let token;
  // CHECK FOR TOKEN
  // split token from 'Bearer' 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('User is not authorized', 401));
  //VERIFY TOKEN
  // npm promisify makes a promise
  const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET, {
    maxAge: process.env.JWTEXPIRES,
  });

  // CHECK USER STILL EXISTS
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('This User does not exist', 401));

  //Check if the password has been changed since token was issued
  // pass in time the token was issued at
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Session Expired, Please Login Again', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTES
  // set req.user to current user
  req.user = currentUser;
  next();
});

// turn off validators (used in development for ease of testing)
await user.save({validateBeforeSave: false})

//USE SAVE, NOT UPDATE, FOR PATCHING USER PASSWORDS
// SAVE AND CREATE are new complete instances of our model; UPDATE only replaces certain info


// NoSQL QUERY INJECTIONS
// this request can log into accounts without knowing their emails by using a query as the email string and guessing the password
// {
// 	"email": {"$gt": ""},
// 	"password": "password"
// }