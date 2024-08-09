const express = require("express");
const startSoapServer = require("./controllers/transactionController");

const app = express();

startSoapServer(app);

module.exports = app;
