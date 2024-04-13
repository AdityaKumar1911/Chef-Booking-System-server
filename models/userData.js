const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    serviceDay: { type: String, required: true },
    serviceStartTime: { type: String, required: true },
    serviceEndTime: { type: String, required: true }
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;
