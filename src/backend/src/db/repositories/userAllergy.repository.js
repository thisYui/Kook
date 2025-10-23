const prisma = require('../../config/prisma');
const logger = require('../../utils/logger');

/**
 * User Allergy Repository
 * Handles all database operations related to user allergies
 */

class UserAllergyRepository {
    /**
     * Get user's allergies
     * @param {string} userId - User ID
     * @returns {Array} - List of user allergies
     */
    async getUserAllergies(userId) {
        try {
            return await prisma.userAllergy.findMany({
                where: {
                    user_id: userId,
                    is_active: true,
                },
                include: {
                    ingredient: {
                        select: {
                            ingredient_key: true,
                            display_name: true,
                            category: true,
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
        } catch (error) {
            logger.error('Error getting user allergies:', error);
            throw error;
        }
    }

    /**
     * Check if allergy exists
     * @param {string} userId - User ID
     * @param {string} ingredientKey - Ingredient key
     * @returns {boolean} - True if allergy exists
     */
    async allergyExists(userId, ingredientKey) {
        try {
            const allergy = await prisma.userAllergy.findFirst({
                where: {
                    user_id: userId,
                    ingredient_key: ingredientKey,
                    is_active: true,
                },
            });
            return !!allergy;
        } catch (error) {
            logger.error('Error checking allergy exists:', error);
            throw error;
        }
    }

    /**
     * Add allergy
     * @param {string} userId - User ID
     * @param {string} ingredientKey - Ingredient key
     * @returns {Object} - Created allergy
     */
    async addAllergy(userId, ingredientKey) {
        try {
            return await prisma.userAllergy.upsert({
                where: {
                    user_id_ingredient_key: {
                        user_id: userId,
                        ingredient_key: ingredientKey,
                    },
                },
                update: {
                    is_active: true,
                    updated_at: new Date(),
                },
                create: {
                    user_id: userId,
                    ingredient_key: ingredientKey,
                    is_active: true,
                },
                include: {
                    ingredient: {
                        select: {
                            ingredient_key: true,
                            display_name: true,
                            category: true,
                        },
                    },
                },
            });
        } catch (error) {
            logger.error('Error adding allergy:', error);
            throw error;
        }
    }

    /**
     * Delete allergy (soft delete)
     * @param {string} userId - User ID
     * @param {string} ingredientKey - Ingredient key
     * @returns {Object} - Update result
     */
    async deleteAllergy(userId, ingredientKey) {
        try {
            return await prisma.userAllergy.updateMany({
                where: {
                    user_id: userId,
                    ingredient_key: ingredientKey,
                    is_active: true,
                },
                data: {
                    is_active: false,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            logger.error('Error deleting allergy:', error);
            throw error;
        }
    }

    /**
     * Count user allergies
     * @param {string} userId - User ID
     * @returns {number} - Number of active allergies
     */
    async countUserAllergies(userId) {
        try {
            return await prisma.userAllergy.count({
                where: {
                    user_id: userId,
                    is_active: true,
                },
            });
        } catch (error) {
            logger.error('Error counting user allergies:', error);
            throw error;
        }
    }

    /**
     * Check if ingredient exists in catalog
     * @param {string} ingredientKey - Ingredient key
     * @returns {boolean} - True if ingredient exists
     */
    async ingredientExists(ingredientKey) {
        try {
            const ingredient = await prisma.ingredientCatalog.findUnique({
                where: {
                    ingredient_key: ingredientKey,
                },
            });
            return !!ingredient;
        } catch (error) {
            logger.error('Error checking ingredient exists:', error);
            throw error;
        }
    }
}

module.exports = new UserAllergyRepository();

