"use strict";

class ResponseWrapper {
    static success(res, message = "Success", data = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(res, message = "Something went wrong", statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
            data: null,
        });
    }
}

module.exports = ResponseWrapper;
