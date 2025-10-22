const prisma = require('../../config/prisma');

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
            select: {
                id: true,
                name: true,
                email: true,
                password_hash: true,
                avatar_url: true,
                language: true,
                theme: true,
                bio: true,
                role: true,
                is_verified: true,
                is_disabled: true,
                is_deleted: true,
                last_login: true,
                last_active: true,
                created_at: true,
                updated_at: true,
            }
        });
    }

    /**
     * Find user by ID
     */
    async findById(id) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                avatar_url: true,
                language: true,
                theme: true,
                bio: true,
                role: true,
                is_verified: true,
                is_disabled: true,
                is_deleted: true,
                last_login: true,
                last_active: true,
                created_at: true,
                updated_at: true,
            }
        });
    }

    /**
     * Create new user
     */
    async create(userData) {
        return await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password_hash: userData.password_hash,
                avatar_url: userData.avatar_url,
                language: userData.language || 'en',
                theme: userData.theme || 'light',
                bio: userData.bio,
                role: userData.role || 'USER',
                is_verified: userData.is_verified || false,
            }
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
                last_active: new Date(),
            }
        });
    }

    /**
     * Increment login attempts - NOT SUPPORTED (no field in schema)
     * This is a placeholder for future implementation
     */
    async incrementLoginAttempts(id) {
        // Schema doesn't support login_attempts tracking
        // You would need to add these fields to User model:
        // - login_attempts Int @default(0)
        // - last_login_attempt DateTime?

        // For now, just log the attempt
        console.warn(`Login attempt tracking not supported for user: ${id}`);
        return null;
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
            }
        });
    }

    /**
     * Disable user account
     */
    async disableUser(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                is_disabled: true,
            }
        });
    }

    /**
     * Soft delete user
     */
    async softDelete(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                is_deleted: true,
                deleted_at: new Date(),
            }
        });
    }

    /**
     * Update user last active time
     */
    async updateLastActive(id) {
        return await prisma.user.update({
            where: { id },
            data: {
                last_active: new Date(),
            }
        });
    }
}

module.exports = new UserRepository();
