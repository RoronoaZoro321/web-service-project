const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (TOPUP service)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "../../configs/config.env" });

const app = require("./topupServiceApp");

const PORT = process.env.TOPUP_PORT;

app.listen(PORT, () => {
    console.log(`TOPUP Service running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (TOPUP service)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
