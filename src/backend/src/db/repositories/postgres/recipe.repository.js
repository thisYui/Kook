const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Recipe Repository
 * Handles all database operations related to recipes
 */

class RecipeRepository {
    /**
     * Create a new recipe
     * @param {Object} recipeData - Recipe data
     * @returns {Object} - Created recipe
     */
    async create(recipeData) {
        try {
            return await prisma.recipe.create({
                data: recipeData,
            });
        } catch (error) {
            logger.error('Error creating recipe:', error);
            throw error;
        }
    }

    /**
     * Find recipe by ID
     * @param {string} recipeId - Recipe ID
     * @returns {Object|null} - Recipe or null
     */
    async findById(recipeId) {
        try {
            return await prisma.recipe.findUnique({
                where: { id: recipeId },
            });
        } catch (error) {
            logger.error('Error finding recipe by ID:', error);
            throw error;
        }
    }

    /**
     * Find recipe by post ID
     * @param {string} postId - Post ID
     * @returns {Object|null} - Recipe or null
     */
    async findByPostId(postId) {
        try {
            return await prisma.recipe.findUnique({
                where: { post_id: postId },
            });
        } catch (error) {
            logger.error('Error finding recipe by post ID:', error);
            throw error;
        }
    }

    /**
     * Update recipe
     * @param {string} recipeId - Recipe ID
     * @param {Object} updateData - Update data
     * @returns {Object} - Updated recipe
     */
    async update(recipeId, updateData) {
        try {
            return await prisma.recipe.update({
                where: { id: recipeId },
                data: updateData,
            });
        } catch (error) {
            logger.error('Error updating recipe:', error);
            throw error;
        }
    }
}

module.exports = new RecipeRepository();
