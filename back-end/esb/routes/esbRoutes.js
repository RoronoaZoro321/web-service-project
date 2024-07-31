const express = require("express");
const esbController = require("../controllers/esbController");

const router = express.Router();

router.post("/auth/signup", esbController.signup);

router.route("/users").get(esbController.getAllUsers);

module.exports = router;
