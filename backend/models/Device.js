const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    serialNumber: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,     
        required: true
    },
    status: {
        type: String,    
        required: true
    }
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
