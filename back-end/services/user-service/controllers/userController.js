const User = require("../../../db/models/userModel");
const catchAsync = require("../../../common/utils/catchAsync");
const AppError = require("../../../common/utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        new AppError("User not found", 400);
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});
