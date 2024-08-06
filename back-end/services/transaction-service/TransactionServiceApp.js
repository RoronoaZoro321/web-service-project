const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const AppError = require("../../common/utils/appError");
const globalErrorHandler = require("../../common/controllers/errorController");
const startSoapServer = require("./controllers/transactionController"); // Import SOAP server setup

const app = express();

startSoapServer(app);

module.exports = app;
