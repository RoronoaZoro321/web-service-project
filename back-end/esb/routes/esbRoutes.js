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
router.get("/users", protect, esbUserController.getAllUsers);
router.get("/users/profile", protect, esbUserController.getProfile);
router.patch("/users/updateMe", protect, esbUserController.updateMe);

module.exports = router;
