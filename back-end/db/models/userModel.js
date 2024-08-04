const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    citizenId: {
        type: String,
        required: [true, "Please insert your citizen card id"],
        unique: true,
    },
    fname: {
        type: String,
        required: [true, "Please tell us your first name"],
    },
    lname: {
        type: String,
        required: [true, "Please tell us your last name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,
    pin: {
        type: String,
        required: [true, "Please provide a pin minimum 4 characters"],
        minlength: 4,
        select: false,
    }
});

userSchema.pre("save", async function (next) {
    console.log(this);
    // Only run this function if pin was actually modified
    if (!this.isModified("pin")) return next();

    // Hash the pin with cost of 12
    this.pin = await bcrypt.hash(this.pin, 12);
    next();
});

// Method to compare pin
userSchema.methods.correctPin = async function (candidatePin, userPin) {
    return await bcrypt.compare(candidatePin, userPin);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
