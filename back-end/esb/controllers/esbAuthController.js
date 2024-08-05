const catchAsync = require("../../common/utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.AUTH_SERVICE_URL}api/v1/auth/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        }
    );

    const data = await response.json();
    const { token, cookieOptions } = data;

    if (data.status === "success") {
        // Convert expires from string back to Date object
        cookieOptions.expires = new Date(cookieOptions.expires);

        // don't send pin back to client
        data.data.user.pin = undefined;

        res.cookie("jwt", token, cookieOptions);
        res.status(201).json({
            status: "success",
            data: {
                detail: data.data,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {
    const response = await fetch(
        `${process.env.AUTH_SERVICE_URL}api/v1/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
        }
    );

    const data = await response.json();
    const { token, cookieOptions } = data;

    if (data.status === "success") {
        // Convert expires from string back to Date object
        cookieOptions.expires = new Date(cookieOptions.expires);

        // don't send pin back to client
        data.data.user.pin = undefined;

        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({
            status: "success",
            data: {
                detail: data.data,
            },
        });
    } else {
        res.status(response.status).json({
            status: "fail",
            message: data.message,
        });
    }
});

exports.logout = catchAsync(async (req, res, next) => {
    await fetch(`${process.env.AUTH_SERVICE_URL}api/v1/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        status: "success",
    });
});
