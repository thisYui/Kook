const RecipeDetail = require('../../models/mongo/RecipeDetail');
const logger = require('../../utils/logger');

/**
 * Recipe Detail Repository (MongoDB)
 * Handles all MongoDB operations related to recipe details
 */

class RecipeDetailRepository {
    /**
     * Create a new recipe detail in MongoDB
     * @param {Object} recipeDetailData - Recipe detail data
     * @returns {Object} - Created recipe detail
     */
    async create(recipeDetailData) {
        try {
            const recipeDetail = new RecipeDetail(recipeDetailData);
            await recipeDetail.save();
            return recipeDetail;
        } catch (error) {
            logger.error('Error creating recipe detail in MongoDB:', error);
            throw error;
        }
    }

    /**
     * Find recipe detail by recipe ID
     * @param {string} recipeId - Recipe ID
     * @returns {Object|null} - Recipe detail or null
     */
    async findByRecipeId(recipeId) {
        try {
            return await RecipeDetail.findOne({ recipe_id: recipeId });
        } catch (error) {
            logger.error('Error finding recipe detail by recipe ID:', error);
            throw error;
        }
    }

    /**
     * Find recipe detail by post ID
     * @param {string} postId - Post ID
     * @returns {Object|null} - Recipe detail or null
     */
    async findByPostId(postId) {
        try {
            return await RecipeDetail.findOne({ post_id: postId });
        } catch (error) {
            logger.error('Error finding recipe detail by post ID:', error);
            throw error;
        }
    }

    /**
     * Find recipe detail by recipe ID and version
     * @param {string} recipeId - Recipe ID
     * @param {number} version - Version number
     * @returns {Object|null} - Recipe detail or null
     */
    async findByRecipeIdAndVersion(recipeId, version) {
        try {
            return await RecipeDetail.findOne({
                recipe_id: recipeId,
                version: version
            });
        } catch (error) {
            logger.error('Error finding recipe detail by recipe ID and version:', error);
            throw error;
        }
    }

    /**
     * Update recipe detail
     * @param {string} recipeId - Recipe ID
     * @param {Object} updateData - Update data
     * @returns {Object} - Updated recipe detail
     */
    async update(recipeId, updateData) {
        try {
            return await RecipeDetail.findOneAndUpdate(
                { recipe_id: recipeId },
                updateData,
                { new: true }
            );
        } catch (error) {
            logger.error('Error updating recipe detail:', error);
            throw error;
        }
    }

    /**
     * Create new version of recipe detail
     * @param {string} recipeId - Recipe ID
     * @param {string} postId - Post ID
     * @param {Array} steps - New steps array
     * @param {number} version - New version number
     * @returns {Object} - Created recipe detail version
     */
    async createNewVersion(recipeId, postId, steps, version) {
        try {
            const recipeDetail = new RecipeDetail({
                recipe_id: recipeId,
                post_id: postId,
                steps: steps,
                version: version
            });
            await recipeDetail.save();
            return recipeDetail;
        } catch (error) {
            logger.error('Error creating new recipe detail version:', error);
            throw error;
        }
    }

    /**
     * Delete recipe detail
     * @param {string} recipeId - Recipe ID
     * @returns {Object} - Delete result
     */
    async delete(recipeId) {
        try {
            return await RecipeDetail.deleteOne({ recipe_id: recipeId });
        } catch (error) {
            logger.error('Error deleting recipe detail:', error);
            throw error;
        }
    }

    /**
     * Get all versions of a recipe
     * @param {string} recipeId - Recipe ID
     * @returns {Array} - Array of recipe detail versions
     */
    async getAllVersions(recipeId) {
        try {
            return await RecipeDetail.find({ recipe_id: recipeId })
                .sort({ version: -1 });
        } catch (error) {
            logger.error('Error getting all versions:', error);
            throw error;
        }
    }
}

module.exports = new RecipeDetailRepository();

