const catchAsync = require("../../common/utils/catchAsync");
const AppError = require("../../common/utils/appError");
const parseStringPromise = require("xml2js").parseStringPromise;

function getUserId(req) {
    return req.user._id;
}

async function checkAccountOwnership(userId, accountId) {
    const req_body = {
        userId,
        accountId,
    };

    const response = await fetch(
        `${process.env.USER_SERVICE_URL}api/v1/users/checkAccountOwnership`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req_body),
        }
    );

    const data = await response.json();

    console.log("data", data);
    return data.result;
}

async function getAccountIdByNumber(accountNumber) {
    try {
        const response = await fetch(
            `${process.env.USER_SERVICE_URL}api/v1/users/getAccountByAccountNumber`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accountNumber }),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log("data", data);

        return {
            accountId: data.data.account._id,
            userId: data.data.account.userId,
        };
    } catch (error) {
        return error;
    }
}

exports.transfer = catchAsync(async (req, res, next) => {
    const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

    // get Id from Number
    const senderAccount = await getAccountIdByNumber(senderAccountNumber);
    const receiverAccount = await getAccountIdByNumber(receiverAccountNumber);

    if (senderAccount instanceof Error) {
        return next(new AppError("Sender account not found", 400));
    }

    if (receiverAccount instanceof Error) {
        return next(new AppError("Receiver account not found", 400));
    }

    const { userId, accountId: senderId } = senderAccount;
    const { accountId: receiverId } = receiverAccount;

    // check if senderId belongs to the user
    const isSenderOwner = await checkAccountOwnership(userId, senderId);
    console.log("isSenderOwner: ", isSenderOwner);
    if (!isSenderOwner) {
        return next(new AppError("You do not own the sender account", 400));
    }

    // check if senderId and receiverId are the same
    if (senderId === receiverId) {
        return next(
            new AppError("Sender and receiver cannot be the same", 400)
        );
    }

    const req_body = {
        senderId,
        receiverId,
        amount,
    };

    const response = await fetch(
        `${process.env.TRANSACTION_SERVICE_URL}api/v1/transaction/transfer`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req_body),
        }
    );

    const data = await response.json();

    if (data.status === "success") {
        res.status(200).json({
            status: "success",
            data: {
                transaction: data.data.transaction,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});

// exports.getAllTransactionsByAccountId = catchAsync(async (req, res, next) => {
//     const { accountNumber } = req.body;

//     const { accountId } = await getAccountIdByNumber(accountNumber);

//     // check if accountId belongs to the user
//     const isOwner = await checkAccountOwnership(getUserId(req), accountId);

//     if (!isOwner) {
//         return next(new AppError("You do not own the account", 400));
//     }

//     const response = await fetch(
//         `${process.env.TRANSACTION_SERVICE_URL}api/v1/transaction/getAllTransactionsByAccountId`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ accountId }),
//         }
//     );

//     const data = await response.json();

//     if (data.status === "success") {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 transactions: data.data.transactions,
//             },
//         });
//     } else {
//         res.status(response.status).json({
//             status: "fail",
//             message: data.message,
//         });
//     }
// });

exports.getAllTransactionsByAccountId = catchAsync(async (req, res, next) => {
    const { accountNumber } = req.body;

    const { accountId } = await getAccountIdByNumber(accountNumber);

    const isOwner = await checkAccountOwnership(getUserId(req), accountId);

    if (!isOwner) {
        return next(new AppError("You do not own the account", 400));
    }

    const xmlRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tran="http://example.com/transaction">
            <soapenv:Header/>
            <soapenv:Body>
                <tran:GetAllTransactionsByAccountId>
                    <tran:AccountID>${accountId}</tran:AccountID>
                </tran:GetAllTransactionsByAccountId>
            </soapenv:Body>
        </soapenv:Envelope>
    `;

    const response = await fetch(
        `${process.env.TRANSACTION_SERVICE_URL}api/v1/transaction`,
        {
            method: "POST",
            headers: {
                "Content-Type": "text/xml",
            },
            body: xmlRequest,
        }
    );

    const responseText = await response.text();

    try {
        const result = await parseStringPromise(responseText);
        const results = JSON.stringify(result);
        console.log(results["soap:Envelope"]);
        const transactions =
            results["soap:Envelope"]["soap:Body"][0][
                "tran:GetAllTransactionsByAccountIdResponse"
            ][0]["tran:Transactions"][0];

        res.status(200).json({
            status: "success",
            data: {
                transactions,
            },
        });
    } catch (err) {
        next(new AppError("Failed to parse SOAP response", 500));
    }
});

exports.topup = catchAsync(async (req, res, next) => {
    const { accountNumber, code } = req.body;

    const { accountId } = await getAccountIdByNumber(accountNumber);

    // check if accountId belongs to the user
    const isOwner = await checkAccountOwnership(getUserId(req), accountId);

    if (!isOwner) {
        return next(new AppError("You do not own the account", 400));
    }

    const response = await fetch(
        `${process.env.TRANSACTION_SERVICE_URL}api/v1/transaction/topup`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountId, code }),
        }
    );

    const data = await response.json();

    console.log(data);

    if (data.status === "success") {
        res.status(200).json({
            status: "success",
            data: {
                account: data.data.account,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});
