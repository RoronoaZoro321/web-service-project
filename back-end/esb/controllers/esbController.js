const axios = require("axios");
const catchAsync = require("../../common/utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    console.log(`${process.env.USER_SERVICE_URL}api/v1/user`);
    const response = await axios.get(
        `${process.env.USER_SERVICE_URL}api/v1/user`
    );

    res.status(200).json({
        status: "success",
        data: {
            detail: response.data,
        },
    });
});

exports.signup = catchAsync(async (req, res, next) => {
    console.log(`${process.env.AUTH_SERVICE_URL}api/v1/user`);
    const response = await axios.post(
        `${process.env.AUTH_SERVICE_URL}api/v1/auth/signup`,
        req.body
    );

    res.status(200).json({
        status: "success",
        data: {
            detail: response.data,
        },
    });
});
