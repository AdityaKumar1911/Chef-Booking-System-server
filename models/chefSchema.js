const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  dishes: { type: [String], required: true },
  serviceStartTime: { type: String, required: true },
  serviceEndTime: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: true } // Default is true, indicating chef is available
});

const ChefData = mongoose.model('ChefData', chefSchema);

module.exports = ChefData;
