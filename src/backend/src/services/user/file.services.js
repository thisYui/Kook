const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const fileUtils = require('../../utils/fileUtils');
const validateUtils = require('../../utils/validateUtils');
const path = require('path');

/**
 * File Service
 * Handles file-related operations (upload, delete, validate)
 */

class FileService {
    /**
     * Validate file format
     * @param {string} format - File format
     * @param {Array<string>} allowedFormats - Allowed formats
     * @throws {AppError} - If invalid
     */
    validateFileFormat(format, allowedFormats) {
        validateUtils.validateEnum(format.toLowerCase(), allowedFormats, 'File format');
    }

    /**
     * Validate file size
     * @param {Buffer} buffer - File buffer
     * @param {number} maxSize - Maximum size in bytes
     * @throws {AppError} - If size exceeds limit
     */
    validateFileSize(buffer, maxSize) {
        if (buffer.length > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `File size must be less than ${maxSizeMB}MB`
            );
        }
    }

    /**
     * Upload avatar for user
     * @param {string} uid - User ID
     * @param {string} avatarData - Base64 encoded avatar data
     * @param {string} formatFile - File format (jpg, png, etc.)
     * @returns {Object} - { filename, filepath, url }
     */
    async uploadAvatar(uid, avatarData, formatFile) {
        try {
            // 1. Validate file format
            const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            this.validateFileFormat(formatFile, allowedFormats);

            // 2. Decode base64 and validate size
            const buffer = Buffer.from(avatarData, 'base64');
            const maxSize = 5 * 1024 * 1024; // 5MB
            this.validateFileSize(buffer, maxSize);

            // 3. Generate filename with timestamp
            const filename = `avatar_${Date.now()}.${formatFile}`;

            // 4. Use fileUtils to save file
            const result = await fileUtils.saveFile(filename, buffer, uid);

            logger.info(`Avatar uploaded for user ${uid}: ${filename}`);

            return {
                filename: result.filename,
                filepath: result.filepath,
                url: result.url,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error uploading avatar:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to upload avatar');
        }
    }

    /**
     * Delete file
     * @param {string} uid - User ID
     * @param {string} filename - Filename to delete
     * @returns {Object} - Success response
     */
    async deleteFile(uid, filename) {
        try {
            // Use fileUtils to delete file
            const exists = await fileUtils.fileExists(filename, uid);

            if (!exists) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'File not found');
            }

            const result = await fileUtils.deleteFile(filename, uid);

            logger.info(`File deleted for user ${uid}: ${filename}`);

            return result;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error deleting file:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to delete file');
        }
    }

    /**
     * Get file path
     * @param {string} uid - User ID
     * @param {string} filename - Filename
     * @returns {string} - File path
     */
    getFilePath(uid, filename) {
        return fileUtils.getFilePath(filename, uid);
    }

    /**
     * Check if file exists
     * @param {string} uid - User ID
     * @param {string} filename - Filename
     * @returns {Promise<boolean>} - True if file exists
     */
    async fileExists(uid, filename) {
        return await fileUtils.fileExists(filename, uid);
    }

    /**
     * Get file info
     * @param {string} uid - User ID
     * @param {string} filename - Filename
     * @returns {Object} - File info (size, created, modified)
     */
    async getFileInfo(uid, filename) {
        try {
            const info = await fileUtils.getFileInfo(filename, uid);

            return {
                filename: info.filename,
                size: info.size,
                created_at: info.created_at,
                modified_at: info.modified_at,
                url: `/api/file/${uid}/${filename}`,
            };

        } catch (error) {
            logger.error('Error getting file info:', error);
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'File not found');
        }
    }
}

module.exports = new FileService();
