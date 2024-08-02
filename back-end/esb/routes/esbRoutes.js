const express = require("express");
const esbAuthController = require("../controllers/esbAuthController");
const esbUserController = require("../controllers/esbUserhController");
const protect = require("../middleware/protect");

const router = express.Router();

// Auth Service
router.post("/auth/signup", esbAuthController.signup);
router.post("/auth/login", esbAuthController.login);
router.get("/auth/logout", esbAuthController.logout);

// User Service
router.route("/users").get(protect, esbUserController.getAllUsers);
router.route("/profile").get(protect, esbUserController.getProfile);

module.exports = router;
