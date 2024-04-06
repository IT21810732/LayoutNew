const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationName: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
