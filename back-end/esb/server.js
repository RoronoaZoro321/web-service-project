const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (ESB)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "../configs/config.env" });

const app = require("./esb");

const PORT = process.env.ESB_PORT || 8000;
app.listen(PORT, () => {
    console.log(`ESB running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (ESB)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
