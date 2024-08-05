const catchAsync = require("../../common/utils/catchAsync");

exports.getProfile = catchAsync(async (req, res, next) => {
    if (!req.user) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
        },
    });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.USER_SERVICE_URL}api/v1/users`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (data.status === "success") {
        res.status(200).json({
            status: "success",
            data: {
                users: data.data.users,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});

exports.updateMe = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.USER_SERVICE_URL}api/v1/users/updateMe`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "User-ID": req.user._id,
            },
            body: JSON.stringify(req.body),
        }
    );

    const data = await response.json();

    if (data.status === "success") {
        res.status(200).json({
            status: "success",
            data: {
                detail: data,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});

exports.createAccount = catchAsync(async (req, res, next) => {

    req.body.userId = req.user._id;

    const response = await fetch(
        `${process.env.USER_SERVICE_URL}api/v1/users/createAccount`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        }
    );

    const data = await response.json();

    if (data.status === "success") {
        res.status(201).json({
            status: "success",
            data: {
                detail: data,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});