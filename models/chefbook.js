const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    serviceDay: { type: String, required: true },
    serviceStartTime: { type: String, required: true },
    serviceEndTime: { type: String, required: true },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChefData', required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
