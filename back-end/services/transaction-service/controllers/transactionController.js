const soap = require("soap");
const Transaction = require("../../../db/models/transactionModel");
const Account = require("../../../db/models/accountModel");
const AppError = require("../../../common/utils/appError");
const fs = require("fs");
const path = require("path");

const wsdlPath = path.join(__dirname, "/transaction.wsdl");

const soapService = {
    TransactionService: {
        TransactionServicePort: {
            GetAllTransactions: async function (args) {
                try {
                    const transactions = await Transaction.find();
                    return {
                        transactions: transactions.map((t) => ({
                            ID: t._id.toString(),
                            SenderID: t.senderId.toString(),
                            ReceiverID: t.receiverId.toString(),
                            Amount: t.amount,
                            CreatedAt: t.createdAt.toISOString(),
                        })),
                    };
                } catch (err) {
                    throw new Error(err.message);
                }
            },
            TransferFunds: async function (args) {
                const { SenderID, ReceiverID, Amount } = args;
                try {
                    const senderAccount = await Account.findById(SenderID);
                    const receiverAccount = await Account.findById(ReceiverID);

                    if (!senderAccount || !receiverAccount) {
                        throw new AppError("Account not found", 400);
                    }

                    if (senderAccount.balance < Amount) {
                        throw new AppError("Insufficient funds", 400);
                    }

                    senderAccount.balance -= Amount;
                    receiverAccount.balance += Amount;

                    const newTransaction = await Transaction.create({
                        senderId: SenderID.toString(),
                        receiverId: ReceiverID.toString(),
                        amount: Amount,
                    });

                    senderAccount.transactionIds.push(newTransaction._id);
                    receiverAccount.transactionIds.push(newTransaction._id);

                    await senderAccount.save();
                    await receiverAccount.save();

                    return {
                        message: "Funds transferred successfully",
                        transaction: {
                            ID: newTransaction._id.toString(),
                            SenderID: newTransaction.senderId.toString(),
                            ReceiverID: newTransaction.receiverId.toString(),
                            Amount: newTransaction.amount,
                            CreatedAt: newTransaction.createdAt.toISOString(),
                        },
                    };
                } catch (err) {
                    throw new Error(err.message);
                }
            },
            GetAllTransactionsByAccountId: async function (args) {
                const { AccountID } = args;
                try {
                    const transactions = await Transaction.find({
                        $or: [
                            { senderId: AccountID },
                            { receiverId: AccountID },
                        ],
                    });
                    return {
                        transactions: transactions.map((t) => ({
                            ID: t._id.toString(),
                            SenderID: t.senderId.toString(),
                            ReceiverID: t.receiverId.toString(),
                            Amount: t.amount,
                            CreatedAt: t.createdAt.toISOString(),
                        })),
                    };
                } catch (err) {
                    throw new Error(err.message);
                }
            },
        },
    },
};

const startSoapServer = (app) => {
    soap.listen(
        app,
        "/soap",
        soapService,
        fs.readFileSync(wsdlPath, "utf8"),
        () => {
            console.log("SOAP server listening on /soap");
        }
    );
};

module.exports = startSoapServer;
