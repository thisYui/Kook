const userAllergyRepository = require('../../db/repositories/userAllergy.repository');
const userRepository = require('../../db/repositories/user.repository.prisma');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * User Allergy Service
 * Handles user allergy business logic
 */

class UserAllergyService {
    /**
     * Get user's allergies
     * @param {string} uid - User ID
     * @returns {Object} - User allergies data
     */
    async getUserAllergies(uid) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 2. Get user allergies
            const allergies = await userAllergyRepository.getUserAllergies(uid);

            // 3. Get total count
            const totalCount = await userAllergyRepository.countUserAllergies(uid);

            logger.info(`User allergies retrieved for user ${uid}: ${allergies.length} items`);

            return {
                success: true,
                uid,
                allergies: allergies.map(allergy => ({
                    id: allergy.id,
                    ingredient_key: allergy.ingredient_key,
                    ingredient_name: allergy.ingredient.display_name,
                    category: allergy.ingredient.category,
                    created_at: allergy.created_at,
                })),
                total: totalCount,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting user allergies:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get user allergies');
        }
    }

    /**
     * Add allergy to user
     * @param {string} uid - User ID
     * @param {string} ingredientKey - Ingredient key
     * @returns {Object} - Success response
     */
    async addAllergy(uid, ingredientKey) {
        try {
            // 1. Validate required fields
            if (!uid || !ingredientKey) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and ingredient key are required');
            }

            // 2. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 3. Validate ingredient exists
            const ingredientExists = await userAllergyRepository.ingredientExists(ingredientKey);
            if (!ingredientExists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Ingredient not found in catalog');
            }

            // 4. Check if already allergic
            const allergyExists = await userAllergyRepository.allergyExists(uid, ingredientKey);
            if (allergyExists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Allergy already exists');
            }

            // 5. Add allergy
            const allergy = await userAllergyRepository.addAllergy(uid, ingredientKey);

            logger.info(`Allergy added for user ${uid}: ${ingredientKey}`);

            return {
                success: true,
                uid,
                allergy: {
                    id: allergy.id,
                    ingredient_key: allergy.ingredient_key,
                    ingredient_name: allergy.ingredient.display_name,
                    category: allergy.ingredient.category,
                    created_at: allergy.created_at,
                },
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error adding allergy:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to add allergy');
        }
    }

    /**
     * Delete allergy from user
     * @param {string} uid - User ID
     * @param {string} ingredientKey - Ingredient key
     * @returns {Object} - Success response
     */
    async deleteAllergy(uid, ingredientKey) {
        try {
            // 1. Validate required fields
            if (!uid || !ingredientKey) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and ingredient key are required');
            }

            // 2. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 3. Check if allergy exists
            const allergyExists = await userAllergyRepository.allergyExists(uid, ingredientKey);
            if (!allergyExists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Allergy not found');
            }

            // 4. Delete allergy
            await userAllergyRepository.deleteAllergy(uid, ingredientKey);

            logger.info(`Allergy deleted for user ${uid}: ${ingredientKey}`);

            return {
                success: true,
                uid,
                ingredient_key: ingredientKey,
                deleted_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error deleting allergy:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to delete allergy');
        }
    }

    /**
     * Batch add allergies
     * @param {string} uid - User ID
     * @param {Array<string>} ingredientKeys - Array of ingredient keys
     * @returns {Object} - Success response
     */
    async batchAddAllergies(uid, ingredientKeys) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 2. Add allergies one by one
            const results = [];
            const errors = [];

            for (const ingredientKey of ingredientKeys) {
                try {
                    const allergy = await userAllergyRepository.addAllergy(uid, ingredientKey);
                    results.push({
                        ingredient_key: ingredientKey,
                        success: true,
                        allergy_id: allergy.id,
                    });
                } catch (error) {
                    errors.push({
                        ingredient_key: ingredientKey,
                        success: false,
                        error: error.message,
                    });
                }
            }

            logger.info(`Batch add allergies for user ${uid}: ${results.length} success, ${errors.length} errors`);

            return {
                success: true,
                uid,
                added: results,
                failed: errors,
                total_added: results.length,
                total_failed: errors.length,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error batch adding allergies:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to batch add allergies');
        }
    }
}

module.exports = new UserAllergyService();

