// routes for getting Reviews, creating new reviews
const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

// (POST /tour/:tourId/reviews) - mergeParams gives access to the params being sent in from tourRoutes
const router = express.Router({ mergeParams: true });

//auth protect all routes below this line
router.use(authController.auth)

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo('user'), reviewController.setTourUserIDs, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports = router;
