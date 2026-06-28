const ApiError = require("../utils/api-error");

const errorHandler = (err, req, res, next) => {

    let error = err;

    if (!(error instanceof ApiError)) {
        error = new ApiError(
            error.statusCode || 500,
            error.message || "Internal Server Error"
        );
    }

    return res.status(error.statusCode).json({
        success: false,
        message: error.message
    });

};

module.exports = errorHandler;