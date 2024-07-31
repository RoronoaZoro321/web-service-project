const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (User service)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "./userConfig.env" });

const app = require("./userServiceApp");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then((con) => console.log("DB connection successful (User service)"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (User service)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
