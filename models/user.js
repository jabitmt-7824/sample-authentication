const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema for user
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// create User model
const User = mongoose.model("User", userSchema);

module.exports = User;