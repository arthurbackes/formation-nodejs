const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: [true, "The email is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
    points: {
        type: BigInt,
        required: false
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);