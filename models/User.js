const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    food: {
        type: String,
    },
    booze: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);