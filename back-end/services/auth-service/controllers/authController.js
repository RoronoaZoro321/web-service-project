const User = require("../../../db/models/userModel");
const catchAsync = require("../../../common/utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../../../common/utils/appError");

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, // Cookie cannot be accessed via JavaScript
        // secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
        httpOnly: false,
        secure: false,
        sameSite: "None",
    };

    res.status(statusCode).json({
        status: "success",
        token,
        cookieOptions,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const { citizenId, name, email, pin } = req.body;

    if (!citizenId || !name || !email || !pin) {
        return next(
            new AppError("Please provide citizenId, name, email, and pin!", 400)
        );
    }

    const newUser = await User.create({
        citizenId: citizenId,
        name: name,
        email: email,
        pin: pin,
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { citizenId, pin } = req.body;

    // 1) Check if citizenId and pin exist
    if (!citizenId || !pin) {
        return next(new AppError("Please provide citizenId and pin!", 400));
    }

    // 2) Check if user exists && pin is correct
    const user = await User.findOne({ citizenId }).select("+pin");
    if (!user || !(await user.correctPin(pin, user.pin))) {
        return next(new AppError("Incorrect citizenId or pin", 401));
    }

    // 3) If everything is ok, send token to client
    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    // res.cookie("sessionId", "", {
    //     expires: new Date(0),
    //     httpOnly: true,
    // });

    res.status(200).json({ status: "success" });
};
