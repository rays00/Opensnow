const mongoose = require('mongoose');

const SlopeSchema = mongoose.Schema({
    name: String,
    long: String,
    lat: String,
    crowded: Number,
    good: Number,
    nosnow: Number,
    cableclosed: Number

}, {
    timestamps: true
});

module.exports = mongoose.model('Slope', SlopeSchema);