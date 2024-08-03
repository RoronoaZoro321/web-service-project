const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (ESB)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "../configs/config.env" });

const app = require("./esb");

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`ESB running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (ESB)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
