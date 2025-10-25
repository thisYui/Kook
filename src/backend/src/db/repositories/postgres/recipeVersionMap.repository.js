const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Recipe Version Map Repository
 * Handles all database operations related to recipe version mapping
 */

class RecipeVersionMapRepository {
    /**
     * Create a new recipe version map
     * @param {Object} versionData - Version data
     * @returns {Object} - Created version map
     */
    async create(versionData) {
        try {
            return await prisma.recipeVersionMap.create({
                data: {
                    ...versionData,
                    is_synced: true,
                    synced_at: new Date(),
                },
            });
        } catch (error) {
            logger.error('Error creating recipe version map:', error);
            throw error;
        }
    }

    /**
     * Find version map by recipe ID
     * @param {string} recipeId - Recipe ID
     * @returns {Array} - List of version maps
     */
    async findByRecipeId(recipeId) {
        try {
            return await prisma.recipeVersionMap.findMany({
                where: { recipe_id: recipeId },
                orderBy: { mongo_version: 'desc' },
            });
        } catch (error) {
            logger.error('Error finding version maps:', error);
            throw error;
        }
    }

    /**
     * Get latest version for recipe
     * @param {string} recipeId - Recipe ID
     * @returns {Object|null} - Latest version map
     */
    async getLatestVersion(recipeId) {
        try {
            return await prisma.recipeVersionMap.findFirst({
                where: { recipe_id: recipeId },
                orderBy: { mongo_version: 'desc' },
            });
        } catch (error) {
            logger.error('Error getting latest version:', error);
            throw error;
        }
    }

    /**
     * Check if version exists
     * @param {string} recipeId - Recipe ID
     * @param {number} version - Version number
     * @returns {boolean} - True if exists
     */
    async versionExists(recipeId, version) {
        try {
            const versionMap = await prisma.recipeVersionMap.findFirst({
                where: {
                    recipe_id: recipeId,
                    mongo_version: version,
                },
            });
            return !!versionMap;
        } catch (error) {
            logger.error('Error checking version existence:', error);
            throw error;
        }
    }

    /**
     * Update sync status
     * @param {string} id - Version map ID
     * @param {boolean} isSynced - Sync status
     * @returns {Object} - Updated version map
     */
    async updateSyncStatus(id, isSynced) {
        try {
            return await prisma.recipeVersionMap.update({
                where: { id },
                data: {
                    is_synced: isSynced,
                    synced_at: isSynced ? new Date() : null,
                },
            });
        } catch (error) {
            logger.error('Error updating sync status:', error);
            throw error;
        }
    }

    /**
     * Get specific version
     * @param {string} recipeId - Recipe ID
     * @param {number} version - Version number
     * @returns {Object|null} - Version map
     */
    async getVersion(recipeId, version) {
        try {
            return await prisma.recipeVersionMap.findFirst({
                where: {
                    recipe_id: recipeId,
                    mongo_version: version,
                },
            });
        } catch (error) {
            logger.error('Error getting version:', error);
            throw error;
        }
    }

    /**
     * Delete old versions (keep only latest N versions)
     * @param {string} recipeId - Recipe ID
     * @param {number} keepCount - Number of versions to keep
     * @returns {number} - Number of deleted versions
     */
    async deleteOldVersions(recipeId, keepCount = 5) {
        try {
            const versions = await this.findByRecipeId(recipeId);

            if (versions.length <= keepCount) {
                return 0;
            }

            const versionsToDelete = versions.slice(keepCount);
            const deleteIds = versionsToDelete.map(v => v.id);

            const result = await prisma.recipeVersionMap.deleteMany({
                where: {
                    id: { in: deleteIds },
                },
            });

            return result.count;
        } catch (error) {
            logger.error('Error deleting old versions:', error);
            throw error;
        }
    }

    /**
     * Get count of versions for a recipe
     * @param {string} recipeId - Recipe ID
     * @returns {number} - Version count
     */
    async countVersions(recipeId) {
        try {
            return await prisma.recipeVersionMap.count({
                where: { recipe_id: recipeId },
            });
        } catch (error) {
            logger.error('Error counting versions:', error);
            throw error;
        }
    }

    /**
     * Get unsynced versions
     * @returns {Array} - List of unsynced version maps
     */
    async getUnsyncedVersions() {
        try {
            return await prisma.recipeVersionMap.findMany({
                where: { is_synced: false },
                include: {
                    recipe: {
                        include: {
                            post: true,
                        },
                    },
                },
            });
        } catch (error) {
            logger.error('Error getting unsynced versions:', error);
            throw error;
        }
    }
}

module.exports = new RecipeVersionMapRepository();
