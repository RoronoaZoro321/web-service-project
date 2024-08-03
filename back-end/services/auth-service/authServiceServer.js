const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (Auth service)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "../../configs/config.env" });

const app = require("./authServiceApp");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then((con) => console.log("DB connection successful (Auth service)"));

const PORT = process.env.AUTH_PORT;

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (Auth service)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
