const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Ingredient Repository
 * Handles all database operations related to ingredients
 */

class IngredientRepository {
    /**
     * Add ingredients to post
     * @param {string} postId - Post ID
     * @param {Array} ingredients - Array of ingredient objects
     * @returns {Object} - Result
     */
    async addIngredientsToPost(postId, ingredients) {
        try {
            const ingredientData = ingredients.map((ing, index) => ({
                post_id: postId,
                ingredient_key: ing.ingredient_key,
                quantity: ing.quantity,
                unit: ing.unit,
                is_optional: ing.is_optional || false,
                display_order: ing.display_order || index,
            }));

            return await prisma.ingredient.createMany({
                data: ingredientData,
            });
        } catch (error) {
            logger.error('Error adding ingredients to post:', error);
            throw error;
        }
    }

    /**
     * Get ingredients for post
     * @param {string} postId - Post ID
     * @returns {Array} - List of ingredients
     */
    async getIngredientsByPostId(postId) {
        try {
            return await prisma.ingredient.findMany({
                where: { post_id: postId },
                include: {
                    ingredient_catalog: true,
                },
                orderBy: { display_order: 'asc' },
            });
        } catch (error) {
            logger.error('Error getting ingredients:', error);
            throw error;
        }
    }

    /**
     * Delete ingredients for post
     * @param {string} postId - Post ID
     * @returns {Object} - Result
     */
    async deleteByPostId(postId) {
        try {
            return await prisma.ingredient.deleteMany({
                where: { post_id: postId },
            });
        } catch (error) {
            logger.error('Error deleting ingredients:', error);
            throw error;
        }
    }
}

module.exports = new IngredientRepository();
