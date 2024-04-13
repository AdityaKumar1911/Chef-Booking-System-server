const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://dituraj2017:dituraj2017@cluster0.wacxrym.mongodb.net/?retryWrites=true&w=majority&appName=Chef-Booking-System';
// const mongoURL = 'mongodb://localhost:27017/chefbooking';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connected to server');
});

db.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = db;
