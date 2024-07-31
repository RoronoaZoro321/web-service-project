const app = require("./authService");

const PORT = process.env.USER_SERVICE_URL;

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
