const prisma = require('../../config/prisma');

/**
 * JWT Token Repository
 * Handles database operations for JWT tokens
 * NOTE: Token generation/verification logic is in jwtToken.service.js
 */

class JwtTokenRepository {
    /**
     * Save token to database
     * @param {string} userId - User ID
     * @param {string} jti - JWT ID
     * @param {string} type - Token type (ACCESS or REFRESH)
     * @param {Date} exp - Expiration date
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - Created token record
     */
    async saveToken(userId, jti, type, exp, deviceInfo = {}) {
        return await prisma.jwtToken.create({
            data: {
                user_id: userId,
                jti: jti,
                type: type,
                exp: exp,
                //device_name: deviceInfo.device || null,
                user_agent: deviceInfo.userAgent || null,
                ip_address: deviceInfo.ip || null,
            }
        });
    }

    /**
     * Find token by JTI
     * @param {string} jti - JWT ID
     * @returns {Object|null} - Token record or null
     */
    async findByJti(jti) {
        return await prisma.jwtToken.findUnique({
            where: { jti }
        });
    }

    /**
     * Check if token is revoked
     * @param {string} jti - JWT ID
     * @returns {boolean} - True if revoked
     */
    async isRevoked(jti) {
        const token = await this.findByJti(jti);
        return token ? token.revoked : true;
    }

    /**
     * Revoke token
     * @param {string} jti - JWT ID
     * @returns {Object} - Updated token record
     */
    async revokeToken(jti) {
        return await prisma.jwtToken.update({
            where: { jti },
            data: {
                revoked: true,
                revoked_at: new Date(),
            }
        });
    }

    /**
     * Revoke all tokens for a user
     * @param {string} userId - User ID
     * @returns {Object} - Update result
     */
    async revokeAllUserTokens(userId) {
        return await prisma.jwtToken.updateMany({
            where: {
                user_id: userId,
                revoked: false,
            },
            data: {
                revoked: true,
                revoked_at: new Date(),
            }
        });
    }

    /**
     * Get all active tokens for a user
     * @param {string} userId - User ID
     * @returns {Array} - List of active tokens
     */
    async getUserTokens(userId) {
        return await prisma.jwtToken.findMany({
            where: {
                user_id: userId,
                revoked: false,
                exp: {
                    gt: new Date(),
                }
            },
            orderBy: {
                created_at: 'desc',
            }
        });
    }

    /**
     * Clean up expired tokens
     * @returns {Object} - Delete result
     */
    async cleanupExpiredTokens() {
        return await prisma.jwtToken.deleteMany({
            where: {
                exp: {
                    lt: new Date(),
                }
            }
        });
    }

    /**
     * Revoke token by device
     * @param {string} userId - User ID
     * @param {string} deviceName - Device name
     * @returns {Object} - Update result
     */
    async revokeDeviceTokens(userId, deviceName) {
        return await prisma.jwtToken.updateMany({
            where: {
                user_id: userId,
                device_name: deviceName,
                revoked: false,
            },
            data: {
                revoked: true,
                revoked_at: new Date(),
            }
        });
    }
}

module.exports = new JwtTokenRepository();
