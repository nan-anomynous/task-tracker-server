const ApiError = require("../utils/api-error");

const validateTask = (req, res, next) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {
        return next(
            new ApiError(400, "Title is required")
        );
    }

    next();
};

module.exports = validateTask;