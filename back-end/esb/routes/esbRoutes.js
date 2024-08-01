const express = require("express");
const esbController = require("../controllers/esbController");
const protect = require("../middleware/protect");

const router = express.Router();

router.post("/auth/signup", esbController.signup);
router.post("/auth/login", esbController.login);
router.get('/auth/logout', esbController.logout);

router.route("/users").get(protect, esbController.getAllUsers)
router.route("/profile").get(protect, esbController.getProfile)

module.exports = router;

