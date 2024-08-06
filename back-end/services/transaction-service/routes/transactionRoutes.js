const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.route("/transactions").get(transactionController.getAllTransactions);
router.route("/transfer").post(transactionController.transfer); // in -> esb
router
    .route("/getAllTransactionsByAccountId")
    .post(transactionController.getAllTransactionsByAccountId); // in -> esb

module.exports = router;
