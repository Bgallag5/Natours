import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to one user'],
  },
  tour: {
    type: Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to one tour'],
  },
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
  numParty: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Must include the number of people in your party'],
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

// bookingSchema.virtual('totalPrice', () => {
//     return this.numParty * this.tour.price
// });


const Booking = model('Booking', bookingSchema);
module.exports = Booking;
