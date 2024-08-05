const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: [true, "Please provide an account number"],
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        default: 1000,
        min: [0, "Balance cannot be negative"],
    },
    transactionIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
});

accountSchema.pre("save", function (next) {
    next();
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
