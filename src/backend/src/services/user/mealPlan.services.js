const mealPlanRepository = require('../../db/repositories/mealPlan.repository');
const userRepository = require('../../db/repositories/user.repository.prisma');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Meal Plan Service
 * Handles meal plan business logic
 */

class MealPlanService {
    /**
     * Get overview of user's meal plans
     * @param {string} uid - User ID
     * @param {Object} options - Query options (limit, offset, activeOnly)
     * @returns {Object} - Meal plans overview
     */
    async overviewUserMealPlans(uid, options = {}) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            const { limit = 20, offset = 0, activeOnly = true } = options;

            // 2. Get meal plans from repository
            const mealPlans = await mealPlanRepository.getUserMealPlans(uid, {
                limit,
                offset,
                activeOnly,
            });

            // 3. Get total count
            const totalCount = await mealPlanRepository.countUserMealPlans(uid, activeOnly);

            logger.info(`Meal plans overview retrieved for user ${uid}: ${mealPlans.length} plans`);

            return {
                success: true,
                uid,
                meal_plans: mealPlans.map(plan => ({
                    plan_id: plan.id,
                    goal: plan.goal,
                    promt: plan.promt,
                    day_start: plan.day_start,
                    version: plan.version,
                    is_active: plan.is_active,
                    created_at: plan.created_at,
                    updated_at: plan.updated_at,
                })),
                total: totalCount,
                limit,
                offset,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting meal plans overview:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get meal plans overview');
        }
    }

    /**
     * Get specific meal plan details
     * @param {string} uid - User ID
     * @param {string} mealPlanID - Meal plan ID
     * @returns {Object} - Meal plan details
     */
    async showUserMealPlans(uid, mealPlanID) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 2. Validate meal plan ID
            if (!mealPlanID) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'Meal plan ID is required');
            }

            // 3. Get meal plan by ID
            const mealPlan = await mealPlanRepository.getMealPlanById(mealPlanID, uid);

            if (!mealPlan) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Meal plan not found or does not belong to user');
            }

            // 4. TODO: Get meal plan details from MongoDB
            // This would include the actual meal data stored in MongoDB
            // For now, return metadata from PostgreSQL

            logger.info(`Meal plan ${mealPlanID} retrieved for user ${uid}`);

            return {
                success: true,
                uid,
                meal_plan: {
                    plan_id: mealPlan.id,
                    goal: mealPlan.goal,
                    promt: mealPlan.promt,
                    day_start: mealPlan.day_start,
                    version: mealPlan.version,
                    is_active: mealPlan.is_active,
                    created_at: mealPlan.created_at,
                    updated_at: mealPlan.updated_at,
                },
                // TODO: Add meal details from MongoDB
                meals: [], // Placeholder for MongoDB data
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting meal plan details:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get meal plan details');
        }
    }

    /**
     * Create new meal plan
     * @param {string} uid - User ID
     * @param {Object} planData - Meal plan data
     * @returns {Object} - Created meal plan
     */
    async createMealPlan(uid, planData) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 2. Validate required fields
            if (!planData.day_start) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'Day start is required');
            }

            // 3. Create meal plan
            const mealPlan = await mealPlanRepository.createMealPlan(uid, planData);

            logger.info(`Meal plan created for user ${uid}: ${mealPlan.id}`);

            return {
                success: true,
                plan_id: mealPlan.id,
                user_id: uid,
                goal: mealPlan.goal,
                day_start: mealPlan.day_start,
                created_at: mealPlan.created_at,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error creating meal plan:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to create meal plan');
        }
    }

    /**
     * Update meal plan
     * @param {string} uid - User ID
     * @param {string} planId - Meal plan ID
     * @param {Object} updateData - Update data
     * @returns {Object} - Success response
     */
    async updateMealPlan(uid, planId, updateData) {
        try {
            // 1. Validate meal plan exists and belongs to user
            const mealPlan = await mealPlanRepository.getMealPlanById(planId, uid);
            if (!mealPlan) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Meal plan not found');
            }

            // 2. Update meal plan
            await mealPlanRepository.updateMealPlan(planId, uid, updateData);

            logger.info(`Meal plan ${planId} updated for user ${uid}`);

            return {
                success: true,
                plan_id: planId,
                updated_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error updating meal plan:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to update meal plan');
        }
    }

    /**
     * Deactivate meal plan
     * @param {string} uid - User ID
     * @param {string} planId - Meal plan ID
     * @returns {Object} - Success response
     */
    async deactivateMealPlan(uid, planId) {
        try {
            // 1. Validate meal plan exists and belongs to user
            const mealPlan = await mealPlanRepository.getMealPlanById(planId, uid);
            if (!mealPlan) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Meal plan not found');
            }

            // 2. Deactivate meal plan
            await mealPlanRepository.deactivateMealPlan(planId, uid);

            logger.info(`Meal plan ${planId} deactivated for user ${uid}`);

            return {
                success: true,
                plan_id: planId,
                is_active: false,
                deactivated_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error deactivating meal plan:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to deactivate meal plan');
        }
    }
}

module.exports = new MealPlanService();

