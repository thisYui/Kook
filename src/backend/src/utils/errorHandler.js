const { ErrorCodes, ErrorStatusCodes } = require('./errorCodes');

/**
 * Custom Application Error
 */
class AppError extends Error {
    constructor(errorCode, message = null, details = null) {
        super(message || errorCode);
        this.name = 'AppError';
        this.errorCode = errorCode;
        this.statusCode = ErrorStatusCodes[errorCode] || 500;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            success: false,
            error: {
                code: this.errorCode,
                message: this.message,
                details: this.details,
            }
        };
    }
}

/**
 * Error Response Helper
 */
class ErrorResponse {
    static send(res, errorCode, message = null, details = null) {
        const statusCode = ErrorStatusCodes[errorCode] || 500;
        return res.status(statusCode).json({
            success: false,
            error: {
                code: errorCode,
                message: message || errorCode,
                details: details || null,
            }
        });
    }

    static sendValidationError(res, errors) {
        return res.status(400).json({
            success: false,
            error: {
                code: ErrorCodes.VALIDATION_FAILED,
                message: 'Validation failed',
                details: errors,
            }
        });
    }

    static sendUnauthorized(res, message = 'Unauthorized') {
        return this.send(res, ErrorCodes.AUTH_UNAUTHORIZED, message);
    }

    static sendNotFound(res, message = 'Resource not found') {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: message,
            }
        });
    }

    static sendServerError(res, error = null) {
        console.error('Server Error:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: ErrorCodes.SERVER_ERROR,
                message: 'Internal server error',
                details: process.env.NODE_ENV === 'development' ? error?.message : null,
            }
        });
    }
}

module.exports = {
    AppError,
    ErrorResponse,
    ErrorCodes,
};

