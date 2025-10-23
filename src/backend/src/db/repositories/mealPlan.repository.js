const prisma = require('../../config/prisma');
const logger = require('../../utils/logger');

/**
 * Meal Plan Repository
 * Handles all database operations related to meal plans
 */

class MealPlanRepository {
    /**
     * Get user's meal plans overview
     * @param {string} userId - User ID
     * @param {Object} options - Query options (limit, offset, activeOnly)
     * @returns {Array} - List of meal plan metadata
     */
    async getUserMealPlans(userId, options = {}) {
        try {
            const { limit = 20, offset = 0, activeOnly = true } = options;

            const where = {
                user_id: userId,
            };

            if (activeOnly) {
                where.is_active = true;
            }

            return await prisma.mealPlanMeta.findMany({
                where,
                orderBy: {
                    created_at: 'desc',
                },
                take: limit,
                skip: offset,
            });
        } catch (error) {
            logger.error('Error getting user meal plans:', error);
            throw error;
        }
    }

    /**
     * Get meal plan by ID
     * @param {string} planId - Meal plan ID
     * @param {string} userId - User ID (for authorization check)
     * @returns {Object|null} - Meal plan or null
     */
    async getMealPlanById(planId, userId) {
        try {
            return await prisma.mealPlanMeta.findFirst({
                where: {
                    id: planId,
                    user_id: userId,
                },
            });
        } catch (error) {
            logger.error('Error getting meal plan by ID:', error);
            throw error;
        }
    }

    /**
     * Count user's meal plans
     * @param {string} userId - User ID
     * @param {boolean} activeOnly - Only count active plans
     * @returns {number} - Number of meal plans
     */
    async countUserMealPlans(userId, activeOnly = true) {
        try {
            const where = {
                user_id: userId,
            };

            if (activeOnly) {
                where.is_active = true;
            }

            return await prisma.mealPlanMeta.count({
                where,
            });
        } catch (error) {
            logger.error('Error counting meal plans:', error);
            throw error;
        }
    }

    /**
     * Create meal plan
     * @param {string} userId - User ID
     * @param {Object} planData - Meal plan data (goal, promt, day_start)
     * @returns {Object} - Created meal plan
     */
    async createMealPlan(userId, planData) {
        try {
            return await prisma.mealPlanMeta.create({
                data: {
                    user_id: userId,
                    goal: planData.goal,
                    promt: planData.promt,
                    day_start: new Date(planData.day_start),
                    version: 1,
                    is_active: true,
                },
            });
        } catch (error) {
            logger.error('Error creating meal plan:', error);
            throw error;
        }
    }

    /**
     * Update meal plan
     * @param {string} planId - Meal plan ID
     * @param {string} userId - User ID
     * @param {Object} updateData - Update data
     * @returns {Object} - Updated meal plan
     */
    async updateMealPlan(planId, userId, updateData) {
        try {
            return await prisma.mealPlanMeta.updateMany({
                where: {
                    id: planId,
                    user_id: userId,
                },
                data: updateData,
            });
        } catch (error) {
            logger.error('Error updating meal plan:', error);
            throw error;
        }
    }

    /**
     * Deactivate meal plan
     * @param {string} planId - Meal plan ID
     * @param {string} userId - User ID
     * @returns {Object} - Updated meal plan
     */
    async deactivateMealPlan(planId, userId) {
        try {
            return await prisma.mealPlanMeta.updateMany({
                where: {
                    id: planId,
                    user_id: userId,
                },
                data: {
                    is_active: false,
                },
            });
        } catch (error) {
            logger.error('Error deactivating meal plan:', error);
            throw error;
        }
    }

    /**
     * Get active meal plans within date range
     * @param {string} userId - User ID
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @returns {Array} - List of meal plans
     */
    async getMealPlansByDateRange(userId, startDate, endDate) {
        try {
            return await prisma.mealPlanMeta.findMany({
                where: {
                    user_id: userId,
                    is_active: true,
                    day_start: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                orderBy: {
                    day_start: 'asc',
                },
            });
        } catch (error) {
            logger.error('Error getting meal plans by date range:', error);
            throw error;
        }
    }
}

module.exports = new MealPlanRepository();

