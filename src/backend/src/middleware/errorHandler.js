const logger = require('../config/logger');
const { AppError, ErrorResponse } = require('../utils/errorHandler');

/**
 * Global Error Handler Middleware
 */
const errorHandlerMiddleware = (err, req, res, next) => {
    // Log error
    logger.error('Error occurred:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip,
    });

    // Handle AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.toJSON());
    }

    // Handle Validation Errors (from express-validator or similar)
    if (err.name === 'ValidationError') {
        return ErrorResponse.sendValidationError(res, err.errors);
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError') {
        return ErrorResponse.send(res, 'AUTH_1005', 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        return ErrorResponse.send(res, 'AUTH_1006', 'Token expired');
    }

    // Handle Multer Errors (file upload)
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return ErrorResponse.send(res, 'FILE_1602', 'File too large');
        }
        return ErrorResponse.send(res, 'FILE_1604', 'File upload failed');
    }

    // Handle Prisma Errors
    if (err.code && err.code.startsWith('P')) {
        if (err.code === 'P2002') {
            return ErrorResponse.send(res, 'VALIDATION_2001', 'Unique constraint violation', {
                field: err.meta?.target,
            });
        }
        if (err.code === 'P2025') {
            return ErrorResponse.sendNotFound(res, 'Record not found');
        }
        return ErrorResponse.send(res, 'SERVER_5002', 'Database error');
    }

    // Default to 500 server error
    return ErrorResponse.sendServerError(res, err);
};

module.exports = errorHandlerMiddleware;
