const express = require("express");
const userController = require("../controllers/userController");
const accountController = require("../controllers/accountController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.get("/getUserById", userController.getUserById);
router.patch("/updateMe", userController.updateMe);
// router.delete("/deleteAllUsers" , userController.deleteAllUsers);

router.get("/getAccountByAccountNumber", accountController.getAccountByAccountNumber);
router.post("/createAccount", accountController.createAccount);
router.get("/getAccountById", accountController.getAccountById);

router.get("/getAllAccounts", accountController.getAllAccounts);
router.get("/getAccountsByUserId", accountController.getAccountsByUserId);

router.delete("/deleteAccountById", accountController.deleteAccountById);

module.exports = router;
