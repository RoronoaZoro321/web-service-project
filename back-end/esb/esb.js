const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const esbRouter = require("./routes/esbRoutes");
const AppError = require("../common/utils/appError");
const globalErrorHandler = require("../common/controllers/errorController");

const app = express();

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
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 2) ROUTES
// app.post("/api/v1/esb/auth/register", async (req, res, next) => {
//     try {
//         const response = await axios.post(
//             `${process.env.AUTH_SERVICE_URL}api/v1/auth/register`,
//             req.body
//         );

//         res.status(200).json({
//             status: "success",
//             data: {
//                 detail: response.data,
//             },
//         });
//     } catch (error) {
//         next(new AppError("Error communicating with Auth Service", 500));
//     }
// });

// app.get("/api/v1/esb/users/", async (req, res, next) => {
//     try {
//         console.log(process.env.USER_SERVICE_URL);
//         const response = await axios.post(
//             `${process.env.USER_SERVICE_URL}api/v1/user/`,
//             req.body
//         );

//         res.status(200).json({
//             status: "success",
//             data: {
//                 detail: response.data,
//             },
//         });
//     } catch (error) {
//         next(new AppError("Error communicating with User Service", 500));
//     }
// });

// 3) ROUTES
app.use("/api/v1/esb", esbRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
