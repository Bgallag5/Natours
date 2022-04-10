const express = require('express');
const authController = require('../../controllers/authController');
const bookingController = require('../../controllers/bookingController')

//import booking controller
const router = express.Router();

router.use(authController.auth)


router.route('/bookings')
// .get(bookingController.getAllBookings)
.post(bookingController.createBooking);

module.exports = router;