const catchAsync = require("../../common/utils/catchAsync");

exports.getProfile = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
        },
    });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const response = await fetch(`${process.env.USER_SERVICE_URL}api/v1/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

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

exports.updateMe = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.USER_SERVICE_URL}api/v1/user/updateMe`,
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

    res.status(200).json({
        status: "success",
        data: {
            detail: data,
        },
    });
});
