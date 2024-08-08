const express = require("express");
const esbAuthController = require("../controllers/esbAuthController");
const esbUserController = require("../controllers/esbUserController");
const esbTransactionController = require("../controllers/esbTrasactionController")
const esbTopupController = require("../controllers/esbTopupController")
const protect = require("../middleware/protect");
const adminProtect = require("../middleware/adminProtect");

const router = express.Router();

// Auth Service
router.post("/auth/signup", esbAuthController.signup);
router.post("/auth/login", esbAuthController.login);
router.get("/auth/logout", esbAuthController.logout);

// User Service
router.get("/users/getAllUsers", adminProtect, esbUserController.getAllUsers);
router.get("/users/profile", protect, esbUserController.getProfile);
router.patch("/users/updateMe", protect, esbUserController.updateMe);

// User Service - Account
router.post("/users/accounts/createAccount", protect, esbUserController.createAccount);
router.get("/users/accounts/getAccountsByUserId", protect, esbUserController.getAccountsByUserId);
router.post("/users/accounts/getAccountById", protect, esbUserController.getAccountById);
router.post("/users/accounts/getAccountByAccountNumber", protect, esbUserController.getAccountByAccountNumber);
router.delete("/users/accounts/deleteAccountById", protect, esbUserController.deleteAccountById);

// Transaction Service
router.post("/transaction/transfer", protect, esbTransactionController.transfer)
router.post("/transaction/MyAccTransactions", protect, esbTransactionController.getAllTransactionsByAccountId)

router.patch("/topup", protect, esbTopupController.topup)
router.post("/topup/createTopup", adminProtect, esbTopupController.createTopup)
router.get("/topup/getAllTopup", adminProtect, esbTopupController.getAllTopup)

module.exports = router;
