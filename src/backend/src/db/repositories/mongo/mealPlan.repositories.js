const MealPlan = require('../../../models/mongo/MealPlan');
const logger = require('../../../utils/logger');

/**
 * MealPlan MongoDB Repository
 * Handles meal plan details storage in MongoDB
 */

class MealPlanMongoRepository {
    /**
     * Get meal plan details by plan_id
     * @param {string} planId - Meal plan ID
     * @returns {Object|null} - Meal plan details
     */
    async getMealPlanDetails(planId) {
        try {
            const mealPlan = await MealPlan.findOne({ plan_id: planId });
            return mealPlan;
        } catch (error) {
            logger.error(`Error getting meal plan details for ${planId}:`, error);
            throw error;
        }
    }

    /**
     * Get meal plan details by plan_id and user_id
     * @param {string} planId - Meal plan ID
     * @param {string} userId - User ID
     * @returns {Object|null} - Meal plan details
     */
    async getMealPlanDetailsByUser(planId, userId) {
        try {
            const mealPlan = await MealPlan.findOne({
                plan_id: planId,
                user_id: userId
            });
            return mealPlan;
        } catch (error) {
            logger.error(`Error getting meal plan details for ${planId} and user ${userId}:`, error);
            throw error;
        }
    }

    /**
     * Create meal plan details
     * @param {Object} mealPlanData - Meal plan data
     * @returns {Object} - Created meal plan
     */
    async createMealPlanDetails(mealPlanData) {
        try {
            const mealPlan = new MealPlan(mealPlanData);
            await mealPlan.save();
            return mealPlan;
        } catch (error) {
            logger.error('Error creating meal plan details:', error);
            throw error;
        }
    }

    /**
     * Update meal plan details
     * @param {string} planId - Meal plan ID
     * @param {Object} updateData - Update data
     * @returns {Object} - Updated meal plan
     */
    async updateMealPlanDetails(planId, updateData) {
        try {
            const mealPlan = await MealPlan.findOneAndUpdate(
                { plan_id: planId },
                updateData,
                { new: true }
            );
            return mealPlan;
        } catch (error) {
            logger.error(`Error updating meal plan details for ${planId}:`, error);
            throw error;
        }
    }

    /**
     * Delete meal plan details
     * @param {string} planId - Meal plan ID
     * @returns {boolean} - Success status
     */
    async deleteMealPlanDetails(planId) {
        try {
            await MealPlan.deleteOne({ plan_id: planId });
            return true;
        } catch (error) {
            logger.error(`Error deleting meal plan details for ${planId}:`, error);
            throw error;
        }
    }

    /**
     * Add meal to a specific day
     * @param {string} planId - Meal plan ID
     * @param {string} day - Day of week
     * @param {string} mealType - Meal type (Breakfast, Lunch, Dinner, Snack)
     * @param {string} recipeId - Recipe ID
     * @returns {Object} - Updated meal plan
     */
    async addMealToDay(planId, day, mealType, recipeId) {
        try {
            const mealPlan = await MealPlan.findOne({ plan_id: planId });
            if (!mealPlan) {
                throw new Error('Meal plan not found');
            }
            await mealPlan.addMeal(day, mealType, recipeId);
            return mealPlan;
        } catch (error) {
            logger.error(`Error adding meal to day ${day} for plan ${planId}:`, error);
            throw error;
        }
    }

    /**
     * Get meals for a specific day
     * @param {string} planId - Meal plan ID
     * @param {string} day - Day of week
     * @returns {Array} - Meals for the day
     */
    async getMealsForDay(planId, day) {
        try {
            const mealPlan = await MealPlan.findOne({ plan_id: planId });
            if (!mealPlan) {
                return [];
            }
            return mealPlan.getMealsForDay(day);
        } catch (error) {
            logger.error(`Error getting meals for day ${day} in plan ${planId}:`, error);
            throw error;
        }
    }

    /**
     * Get all recipe IDs in a meal plan
     * @param {string} planId - Meal plan ID
     * @returns {Array} - Recipe IDs
     */
    async getAllRecipeIds(planId) {
        try {
            const mealPlan = await MealPlan.findOne({ plan_id: planId });
            if (!mealPlan) {
                return [];
            }
            return mealPlan.getAllRecipeIds();
        } catch (error) {
            logger.error(`Error getting recipe IDs for plan ${planId}:`, error);
            throw error;
        }
    }
}

module.exports = new MealPlanMongoRepository();

