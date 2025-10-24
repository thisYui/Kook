const jwtTokenService = require('../services/auth/jwtToken.service');
const userRepository = require('../db/repositories/user.repository.prisma');
const { AppError, ErrorCodes, ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header and attaches user to request
 */

/**
 * Extract token from Authorization header
 * @param {Object} req - Express request object
 * @returns {string|null} - Extracted token or null
 */
const extractToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return null;
    }

    // Check if header starts with "Bearer "
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7); // Remove "Bearer " prefix
    }

    return authHeader; // Return as-is if no Bearer prefix
};

/**
 * Main authentication middleware
 * Validates JWT token and attaches user info to request
 */
const authenticateToken = async (req, res, next) => {
    try {
        // Extract token from header
        const token = extractToken(req);

        if (!token) {
            return ErrorResponse.send(
                res,
                ErrorCodes.AUTH_TOKEN_REQUIRED,
                'Authentication token is required'
            );
        }

        // Validate token (verify signature + check database)
        const decoded = await jwtTokenService.validateToken(token);

        // Get user from database
        const user = await userRepository.findById(decoded.uid);

        if (!user) {
            return ErrorResponse.send(
                res,
                ErrorCodes.USER_NOT_FOUND,
                'User not found'
            );
        }

        // Check if user is disabled
        if (user.is_disabled) {
            return ErrorResponse.send(
                res,
                ErrorCodes.USER_DISABLED,
                'User account is disabled'
            );
        }

        // Check if user is deleted
        if (user.is_deleted) {
            return ErrorResponse.send(
                res,
                ErrorCodes.USER_DELETED,
                'User account has been deleted'
            );
        }

        // Attach user and token info to request
        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            is_verified: user.is_verified,
        };
        req.token = {
            jti: decoded.jti,
            type: decoded.type,
            rememberMe: decoded.rememberMe,
        };

        logger.info(`User authenticated: ${user.id} (${user.email})`);
        next();

    } catch (error) {
        // Handle specific JWT errors
        if (error instanceof AppError) {
            return ErrorResponse.send(res, error.code, error.message);
        }

        logger.error('Authentication error:', error);
        return ErrorResponse.send(
            res,
            ErrorCodes.AUTH_INVALID_TOKEN,
            'Invalid or expired token'
        );
    }
};

/**
 * Optional authentication middleware
 * Validates token if present, but doesn't require it
 * Useful for endpoints that work with or without authentication
 */
const optionalAuth = async (req, res, next) => {
    try {
        const token = extractToken(req);

        if (!token) {
            // No token provided, continue without authentication
            req.user = null;
            return next();
        }

        // Validate token if present
        const decoded = await jwtTokenService.validateToken(token);
        const user = await userRepository.findById(decoded.uid);

        if (user && !user.is_disabled && !user.is_deleted) {
            req.user = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                is_verified: user.is_verified,
            };
            req.token = {
                jti: decoded.jti,
                type: decoded.type,
                rememberMe: decoded.rememberMe,
            };
        } else {
            req.user = null;
        }

        next();

    } catch (error) {
        // If token validation fails, continue without authentication
        logger.warn('Optional auth failed, continuing without user:', error.message);
        req.user = null;
        next();
    }
};

/**
 * Role-based authorization middleware
 * Requires user to have specific role(s)
 * @param {...string} roles - Allowed roles
 */
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return ErrorResponse.send(
                res,
                ErrorCodes.AUTH_TOKEN_REQUIRED,
                'Authentication required'
            );
        }

        if (!roles.includes(req.user.role)) {
            return ErrorResponse.send(
                res,
                ErrorCodes.AUTH_INSUFFICIENT_PERMISSIONS,
                `Access denied. Required roles: ${roles.join(', ')}`
            );
        }

        next();
    };
};

/**
 * Verify user email middleware
 * Requires user to have verified email
 */
const requireVerifiedEmail = (req, res, next) => {
    if (!req.user) {
        return ErrorResponse.send(
            res,
            ErrorCodes.AUTH_TOKEN_REQUIRED,
            'Authentication required'
        );
    }

    if (!req.user.is_verified) {
        return ErrorResponse.send(
            res,
            ErrorCodes.USER_NOT_VERIFIED,
            'Email verification required'
        );
    }

    next();
};

/**
 * Admin only middleware
 * Shorthand for requireRole('ADMIN')
 */
const requireAdmin = requireRole('ADMIN');

/**
 * Moderator or Admin middleware
 */
const requireModerator = requireRole('ADMIN', 'MODERATOR');

module.exports = {
    authenticateToken,
    optionalAuth,
    requireRole,
    requireVerifiedEmail,
    requireAdmin,
    requireModerator,
    extractToken,
};

