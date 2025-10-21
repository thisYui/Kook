const prisma = require('../config/prisma');

/**
 * User Repository - Prisma
 * Handles all database operations related to users
 */

class UserRepository {
    /**
     * Find user by email
     */
    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email },
            include: {
                profile: true,
            }
        });
    }

    /**
     * Find user by ID
     */
    async findById(id) {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
            }
        });
    }

    /**
     * Create new user
     */
    async create(userData) {
        return await prisma.user.create({
            data: userData,
        });
    }

    /**
     * Update user
     */
    async update(id, userData) {
        return await prisma.user.update({
            where: { id },
            data: userData,
        });
    }

    /**
     * Update last login time
     */
    async updateLastLogin(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                last_login: new Date(),
            }
        });
    }

    /**
     * Increment login attempts
     */
    async incrementLoginAttempts(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                login_attempts: {
                    increment: 1
                },
                last_login_attempt: new Date(),
            }
        });
    }

    /**
     * Reset login attempts
     */
    async resetLoginAttempts(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                login_attempts: 0,
                last_login_attempt: null,
            }
        });
    }

    /**
     * Check if user exists by email
     */
    async existsByEmail(email) {
        const count = await prisma.user.count({
            where: { email }
        });
        return count > 0;
    }

    /**
     * Update user verification status
     */
    async verifyUser(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                is_verified: true,
                verified_at: new Date(),
            }
        });
    }
}

module.exports = new UserRepository();
