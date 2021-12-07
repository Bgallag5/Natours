const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// requests coming into Tour Routes looking for '/:tourId/reviews' get passed through to the review Router
router.use('/:tourId/reviews', reviewRouter);

////MIDDLEWARE
// can set params on your router
// router.param('id', tourController.checkID);
router
  .route('/top5')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.auth, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(
    authController.auth,
    //function to restrict access by role
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );



module.exports = router;
