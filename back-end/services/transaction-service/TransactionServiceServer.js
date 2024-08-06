const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (Transaction service)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "../../configs/config.env" });

const app = require("./TransactionServiceApp");

const PORT = process.env.TRANSACTION_PORT;

app.listen(PORT, () => {
    console.log(`Transaction Service running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (Transaction service)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
