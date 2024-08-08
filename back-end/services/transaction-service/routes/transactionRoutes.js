const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.route("/transactions").get(transactionController.getAllTransactions);
router.route("/transfer").post(transactionController.TransferFunds); // in -> esb
router.route("/getAllTransactionsByAccountId").post(transactionController.getAllTransactionsByAccountId); // in -> esb

router.route("/topup").patch(transactionController.topup); // in -> esb
router.route("/createTopup").post(transactionController.createTopup);
router.route("/topupAll").get(transactionController.getAllTopup);

module.exports = router;
