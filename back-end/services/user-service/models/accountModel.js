const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: [true, "Please provide an initial balance"],
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
    this.updatedAt = Date.now();
    next();
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;

const User = mongoose.model("User", userSchema);

module.exports = User;
