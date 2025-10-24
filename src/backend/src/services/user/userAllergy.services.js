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
            // Validate user exists (business rule)
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // Get user allergies
            const allergies = await userAllergyRepository.getUserAllergies(uid);
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
            // Validate user exists (business rule)
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // Validate ingredient exists (business rule)
            const ingredientExists = await userAllergyRepository.ingredientExists(ingredientKey);
            if (!ingredientExists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Ingredient not found in catalog');
            }

            // Check if already allergic (business rule)
            const allergyExists = await userAllergyRepository.allergyExists(uid, ingredientKey);
            if (allergyExists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Allergy already exists');
            }

            // Add allergy
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
            // Validate user exists (business rule)
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // Check if allergy exists (business rule)
            const allergyExists = await userAllergyRepository.allergyExists(uid, ingredientKey);
            if (!allergyExists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Allergy not found');
            }

            // Delete allergy
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
}

module.exports = new UserAllergyService();
