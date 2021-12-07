// controller functions for get and create reviews
const Review = require('../models/Review');
const handlerFactory = require('./handlerFactory');

// set ID's for tour and user 
exports.setTourUserIDs = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = handlerFactory.getAll(Review)
exports.createReview = handlerFactory.createOne(Review)
exports.getOneReview = handlerFactory.getOne(Review)
exports.updateReview = handlerFactory.updateOne(Review)
exports.deleteReview = handlerFactory.deleteOne(Review)


