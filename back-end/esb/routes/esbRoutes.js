const express = require("express");
const esbAuthController = require("../controllers/esbAuthController");
const esbUserController = require("../controllers/esbUserController");
const esbTransactionController = require("../controllers/esbTrasactionController")
const protect = require("../middleware/protect");

const router = express.Router();

// Auth Service
router.post("/auth/signup", esbAuthController.signup);
router.post("/auth/login", esbAuthController.login);
router.get("/auth/logout", esbAuthController.logout);

// User Service
router.get("/users/getAllUsers", protect, esbUserController.getAllUsers);
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

router.patch("/transaction/topup", protect, esbTransactionController.topup)

module.exports = router;
