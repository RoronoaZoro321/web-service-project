const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.patch("/updateMe", userController.updateMe);

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.getUserById);

module.exports = router;
