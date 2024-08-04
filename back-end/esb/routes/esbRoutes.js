const express = require("express");
const esbAuthController = require("../controllers/esbAuthController");
const esbUserController = require("../controllers/esbUserController");
const protect = require("../middleware/protect");

const router = express.Router();

// Auth Service
router.post("/auth/signup", esbAuthController.signup);
router.post("/auth/login", esbAuthController.login);
router.get("/auth/logout", esbAuthController.logout);

// User Service
router.route("/users").get(protect, esbUserController.getAllUsers);
router.route("/users/profile").get(protect, esbUserController.getProfile);
router.route("/users/updateMe").patch(protect, esbUserController.updateMe);

module.exports = router;
