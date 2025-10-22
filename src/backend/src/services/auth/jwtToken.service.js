const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtTokenRepository = require('../../db/repositories/jwtToken.repository');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const {
  JWT_ACCESS_TOKEN_EXPIRE,
  JWT_REFRESH_TOKEN_EXPIRE,
  JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
  JWT_REFRESH_TOKEN_EXPIRE_SECONDS
} = require('../../constants');

/**
 * JWT Token Service
 * Handles JWT token generation, validation and management
 */

class JwtTokenService {
    /**
     * Generate JWT access token
     * @param {string} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - { token, jti, exp }
     */
    generateAccessToken(userId, deviceInfo = {}) {
        const jti = crypto.randomBytes(32).toString('hex');
        const iat = Math.floor(Date.now() / 1000);

        const payload = {
            uid: userId,
            type: 'access',
            jti: jti,
            device: deviceInfo.device || 'unknown',
            userAgent: deviceInfo.userAgent || 'unknown',
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
        });

        // Calculate expiration time
        const exp = iat + JWT_ACCESS_TOKEN_EXPIRE_SECONDS;

        return {
            token,
            jti,
            exp: new Date(exp * 1000),
        };
    }

    /**
     * Generate JWT refresh token
     * @param {string} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - { token, jti, exp }
     */
    generateRefreshToken(userId, deviceInfo = {}) {
        const jti = crypto.randomBytes(32).toString('hex');
        const iat = Math.floor(Date.now() / 1000);

        const payload = {
            uid: userId,
            type: 'refresh',
            jti: jti,
            device: deviceInfo.device || 'unknown',
            userAgent: deviceInfo.userAgent || 'unknown',
        };

        const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key', {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
        });

        // Calculate expiration time
        const exp = iat + JWT_REFRESH_TOKEN_EXPIRE_SECONDS;

        return {
            token,
            jti,
            exp: new Date(exp * 1000),
        };
    }

    /**
     * Create and save access token to database
     * @param {string} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - { token, jti, exp }
     */
    async createAccessToken(userId, deviceInfo = {}) {
        try {
            // Generate token
            const tokenData = this.generateAccessToken(userId, deviceInfo);

            // Save to database
            await jwtTokenRepository.saveToken(
                userId,
                tokenData.jti,
                'ACCESS',
                tokenData.exp,
                deviceInfo
            );

            logger.info(`Access token created for user: ${userId}`);
            return tokenData;
        } catch (error) {
            logger.error('Failed to create access token:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to create access token');
        }
    }

    /**
     * Create and save refresh token to database
     * @param {string} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - { token, jti, exp }
     */
    async createRefreshToken(userId, deviceInfo = {}) {
        try {
            // Generate token
            const tokenData = this.generateRefreshToken(userId, deviceInfo);

            // Save to database
            await jwtTokenRepository.saveToken(
                userId,
                tokenData.jti,
                'REFRESH',
                tokenData.exp,
                deviceInfo
            );

            logger.info(`Refresh token created for user: ${userId}`);
            return tokenData;
        } catch (error) {
            logger.error('Failed to create refresh token:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to create refresh token');
        }
    }

    /**
     * Create token pair (access + refresh)
     * @param {string} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - { accessToken, refreshToken }
     */
    async createTokenPair(userId, deviceInfo = {}) {
        try {
            const accessTokenData = await this.createAccessToken(userId, deviceInfo);
            const refreshTokenData = await this.createRefreshToken(userId, deviceInfo);

            return {
                accessToken: accessTokenData.token,
                refreshToken: refreshTokenData.token,
                expiresIn: JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
            };
        } catch (error) {
            logger.error('Failed to create token pair:', error);
            throw error;
        }
    }

    /**
     * Verify JWT access token
     * @param {string} token - JWT token
     * @returns {Object} - Decoded token payload
     */
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new AppError(ErrorCodes.AUTH_TOKEN_EXPIRED);
            }
            throw new AppError(ErrorCodes.AUTH_INVALID_TOKEN);
        }
    }

    /**
     * Verify JWT refresh token
     * @param {string} token - Refresh token
     * @returns {Object} - Decoded token payload
     */
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_EXPIRED);
            }
            throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_INVALID);
        }
    }

    /**
     * Validate and verify token with database check
     * @param {string} token - JWT token
     * @returns {Object} - Decoded payload if valid
     */
    async validateToken(token) {
        try {
            // Verify token signature and expiration
            const decoded = this.verifyAccessToken(token);

            // Check if token is revoked in database
            const isRevoked = await jwtTokenRepository.isRevoked(decoded.jti);
            if (isRevoked) {
                throw new AppError(ErrorCodes.AUTH_INVALID_TOKEN, 'Token has been revoked');
            }

            return decoded;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Token validation error:', error);
            throw new AppError(ErrorCodes.AUTH_INVALID_TOKEN);
        }
    }

    /**
     * Refresh access token
     * @param {string} refreshToken - Refresh token
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - New access token
     */
    async refreshAccessToken(refreshToken, deviceInfo = {}) {
        try {
            // Verify refresh token
            const decoded = this.verifyRefreshToken(refreshToken);

            // Check if refresh token is revoked
            const isRevoked = await jwtTokenRepository.isRevoked(decoded.jti);
            if (isRevoked) {
                throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_INVALID, 'Refresh token has been revoked');
            }

            // Create new access token
            const newAccessToken = await this.createAccessToken(decoded.uid, deviceInfo);

            logger.info(`Access token refreshed for user: ${decoded.uid}`);

            return {
                success: true,
                token: newAccessToken.token,
                expiresIn: JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Token refresh error:', error);
            throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_INVALID, 'Failed to refresh token');
        }
    }

    /**
     * Revoke token
     * @param {string} jti - JWT ID
     * @returns {Object} - Success response
     */
    async revokeToken(jti) {
        try {
            await jwtTokenRepository.revokeToken(jti);
            logger.info(`Token revoked: ${jti}`);
            return { success: true, message: 'Token revoked successfully' };
        } catch (error) {
            logger.error('Failed to revoke token:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to revoke token');
        }
    }

    /**
     * Revoke all user tokens
     * @param {string} userId - User ID
     * @returns {Object} - Success response
     */
    async revokeAllUserTokens(userId) {
        try {
            await jwtTokenRepository.revokeAllUserTokens(userId);
            logger.info(`All tokens revoked for user: ${userId}`);
            return { success: true, message: 'All tokens revoked successfully' };
        } catch (error) {
            logger.error('Failed to revoke all user tokens:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to revoke tokens');
        }
    }

    /**
     * Get user active tokens
     * @param {string} userId - User ID
     * @returns {Array} - List of active tokens
     */
    async getUserTokens(userId) {
        try {
            return await jwtTokenRepository.getUserTokens(userId);
        } catch (error) {
            logger.error('Failed to get user tokens:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get user tokens');
        }
    }

    /**
     * Cleanup expired tokens
     * @returns {Object} - Delete result
     */
    async cleanupExpiredTokens() {
        try {
            const result = await jwtTokenRepository.cleanupExpiredTokens();
            logger.info(`Cleaned up ${result.count} expired tokens`);
            return result;
        } catch (error) {
            logger.error('Failed to cleanup expired tokens:', error);
            throw error;
        }
    }
}

module.exports = new JwtTokenService();
