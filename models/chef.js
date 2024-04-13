// ChefSchema.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Chef schema
const chefSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  availableDates: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  }
});

// Create a model using the schema
const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;
