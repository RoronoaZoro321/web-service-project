const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../../common/utils/appError");
const catchAsync = require("../../common/utils/catchAsync");

const protect = catchAsync(async (req, res, next) => {
    let token;
    console.log(req.cookies);
    if (req.cookies && req.cookies.sessionId) {
        token = req.cookies.sessionId;
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 1) Request user by id => response
    const response = await fetch(
        `${process.env.USER_SERVICE_URL}api/v1/users/getUserById`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: decoded.id }),
        }
    );

    const data = await response.json();

    // 2) currentUser => res.data.user
    const currentUser = data.data.user;

    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    req.user = currentUser;

    next();
});

module.exports = protect;
