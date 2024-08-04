const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    accountFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Please provide the transaction amount"],
    },
    accountTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    Time: {
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
