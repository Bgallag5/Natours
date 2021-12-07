const Tour = require('../models/Tours');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const handlerFactory = require('./handlerFactory');


// call our handlers from our handlerFactory file - pass in the model
exports.createTour = handlerFactory.createOne(Tour);
exports.getOneTour = handlerFactory.getOne(Tour, 'reviews');
// with more options: exports.getOneTour = handlerFactory.getOne(Tour, { path: 'reviews', select: $ne: price > 1000})
exports.getAllTours = handlerFactory.getAll(Tour);
exports.updateTour = handlerFactory.updateOne(Tour);
exports.deleteTour = handlerFactory.deleteOne(Tour);


//dedicated route for popular searches (premake a 'sort by best' route)
//middleware to set query params before passing into getAllTours
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
  next();
};

// .aggregate to calculate tour stats - .aggregate is mongoose native method - generate stats from our DB
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
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
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
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
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numTourStarts: -1,
      },
    },
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
});
