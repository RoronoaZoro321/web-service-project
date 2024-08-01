const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require("../../common/utils/appError");
const User = require('../../db/models/userModel');
const catchAsync = require("../../common/utils/catchAsync");

// const cookieParser = require('cookie-parser');

// app.use(cookieParser());


const protect = catchAsync(async (req, res, next) => {
    let token;
    console.log(`\n\n\n${req.cookies.jwt}\n\n\n`);
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 1) Request user by id => response
    const response = await fetch(`${process.env.USER_SERVICE_URL}api/v1/user/${decoded.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    // 2) currentUser => res.data.user
    const currentUser = data.data.user

    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(new AppError('User recently changed password! Please log in again.', 401));
    // }

    req.user = currentUser;

    next();
});

module.exports = protect;
