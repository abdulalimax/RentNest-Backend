import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
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

export default globalErrorHandler;
