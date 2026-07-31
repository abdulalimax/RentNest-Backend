"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorDetails = err;
    if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Validation Error';
        errorDetails = err.issues;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
