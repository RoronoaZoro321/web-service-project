const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../../configs/config.env" });

const app = require("./authServiceApp");


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    serverSelectionTimeoutMS: 10000, // Increase timeout to 30 seconds
})
.then((con) => {
    console.log('DB connection successful (Auth service)');
})
.catch((error) => {
    console.error('DB connection error:', error);
});


const PORT = process.env.AUTH_SERVICE_PORT;


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

