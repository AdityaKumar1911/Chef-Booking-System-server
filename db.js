const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://visheshkumar41:BwnxVrz3tkBnI90T@cluster0.fozhk6m.mongodb.net/Booking-Chef';
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
