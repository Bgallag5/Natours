// routes for getting Reviews, creating new reviews
const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

// (POST /tour/:tourId/reviews) - mergeParams gives access to the params being sent in from tourRoutes
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.auth,
    authController.restrictTo('user', 'admin'),
    reviewController.setTourUserIDs,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(
    authController.auth,
    authController.restrictTo('user', 'admin', 'lead-guide'),
    reviewController.deleteReview
  );

module.exports = router;
