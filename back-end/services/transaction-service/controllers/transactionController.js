const Transaction = require("../../../db/models/transactionModel");
const Account = require("../../../db/models/accountModel");
const Topup = require("../../../db/models/topupModel");
const catchAsync = require("../../../common/utils/catchAsync");
const AppError = require("../../../common/utils/appError");

// Get all transactions
exports.getAllTransactions = catchAsync(async (req, res, next) => {
    const transactions = await Transaction.find();

    res.status(200).json({
        status: "success",
        results: transactions.length,
        data: {
            transactions,
        },
    });
});

async function transferFunds(senderId, receiverId, amount) {
    const senderAccount = await Account.findById(senderId);
    const receiverAccount = await Account.findById(receiverId);

    if (!senderAccount || !receiverAccount) {
        return next(new AppError("Account not found", 400));
    }
    
    if (senderAccount.balance < amount) {
        return next(new AppError("Insufficient funds", 400));
    }
    
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    const newTransaction = await createTransaction(senderId, receiverId, amount);

    senderAccount.transactionIds.push(newTransaction._id);
    receiverAccount.transactionIds.push(newTransaction._id);

    await senderAccount.save();
    await receiverAccount.save();

    return newTransaction;
}

async function createTransaction(senderId, receiverId, amount) {
    const newTransaction = await Transaction.create({
        senderId,
        receiverId,
        amount,
    });

    return newTransaction;
}



// Transfer funds between accounts
exports.transfer = catchAsync(async (req, res, next) => {
    const { senderId, receiverId, amount } = req.body;
    const transaction = await transferFunds(senderId, receiverId, amount);

    if (transaction) {
        res.status(200).json({
            status: "success",
            data: {
                message: "Funds transferred successfully",
                transaction,
            },
        });
    }
});

// Get all transactions by account id
exports.getAllTransactionsByAccountId = catchAsync(async (req, res, next) => {
    const accountId = req.body.accountId;

    const transactions = await Transaction.find({
        $or: [{ senderId: accountId }, { receiverId: accountId }],
    });

    res.status(200).json({
        status: "success",
        results: transactions.length,
        data: {
            transactions,
        },
    });
});

exports.topup = catchAsync(async (req, res, next) => {
    const { accountId, code } = req.body;
    const account = await Account.findById(accountId);

    if (!account) {
        return next(new AppError("Account not found", 400));
    }

    const topup = await Topup.findOne({ code });

    if (!topup) {
        return next(new AppError("Invalid code", 400));
    }

    if (topup.isUsed) {
        return next(new AppError("Code already used", 400));
    }

    account.balance += topup.amount;
    topup.isUsed = true;
    await account.save();
    await topup.save();

    res.status(200).json({
        status: "success",
        data: {
            message: "Topup successful",
            account,
        },
    });
});
    
exports.createTopup = catchAsync(async (req, res, next) => {
    const { code, amount } = req.body;
    const topup = await Topup.create({
        code,
        amount,
    });

    res.status(201).json({
        status: "success",
        data: {
            topup,
        },
    });
});


exports.getAllTopup = catchAsync(async (req, res, next) => {
    const topups = await Topup.find();

    res.status(200).json({
        status: "success",
        results: topups.length,
        data: {
            topups,
        },
    });
});