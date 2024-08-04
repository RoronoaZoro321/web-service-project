const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/getUserById", userController.getUserById);
router.patch("/updateMe", userController.updateMe);

router.route("/").get(userController.getAllUsers);

module.exports = router;
