const mongoose = require('mongoose');

const ScooterSchema = mongoose.Schema({
    coordinates : {
        type : Array,
        required: true
    },
    battery : {
        type : Number,
        required: true
    }
})

module.exports = mongoose.model('Scooters',ScooterSchema)
