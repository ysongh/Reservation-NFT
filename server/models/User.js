const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    walletAddress: {
        type: String,
    },
    privateKey: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema); 