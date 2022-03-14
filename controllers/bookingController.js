const Booking = require('../models/Booking');
const handlerFactory = require('./handlerFactory');



// exports.getAllBookings = handlerFactory.getAll(Booking);
exports.createBooking = handlerFactory.createOne(Booking);


