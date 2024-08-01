const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const esbRouter = require("./routes/esbRoutes");
const AppError = require("../common/utils/appError");
const globalErrorHandler = require("../common/controllers/errorController");

const protect = require("./middleware/protect")
const cookieParser = require('cookie-parser');

const app = express();


// // middleware to protect routes
// app.use((req, res, next) => {
//     // Protect all routes except /auth/signup and /auth/login
//     // console.log(req.path); /api/v1/esb/auth/login
//    if (req.path === "/api/v1/esb/auth/login" || req.path === "/api/v1/esb/auth/signup") {
//         // console.log("next");
//         next();
//     } else {
//         // console.log("protect");
//         console.log("Cookies:", req.cookies);
//         protect(req, res, next);
//     }
// });

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Serving static file
app.use(express.static(`${__dirname}/public`));

// Test middleware
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// });

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse cookies

app.use((req, res, next) => {
    console.log("Cookies:", req.cookies);
    next();
});


// 3) ROUTES
app.use("/api/v1/esb", esbRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);


module.exports = app;
