const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    accountFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    accountFromNumber: {
        type: Number,
        required: [true, "Please provide the account from number"],
    },
    amount: {
        type: Number,
        required: [true, "Please provide the amount"],
        min: [1, "Amount cannot be negative or zero"],
    },
    accountTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    accountToNumber: {
        type: Number,
        required: [true, "Please provide the account to number"],
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

transactionSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
