const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const fs = require('fs').promises;
const path = require('path');

/**
 * File Service
 * Handles file-related operations (upload, delete, validate)
 */

class FileService {
    constructor() {
        // Base upload directory
        this.uploadsDir = path.join(__dirname, '../../../uploads');
    }

    /**
     * Get user upload directory
     * @param {string} uid - User ID
     * @returns {string} - User upload directory path
     */
    getUserUploadDir(uid) {
        return path.join(this.uploadsDir, uid);
    }

    /**
     * Ensure user upload directory exists
     * @param {string} uid - User ID
     * @returns {Promise<string>} - Directory path
     */
    async ensureUserUploadDir(uid) {
        const userDir = this.getUserUploadDir(uid);
        await fs.mkdir(userDir, { recursive: true });
        return userDir;
    }

    /**
     * Validate file format
     * @param {string} format - File format
     * @param {Array<string>} allowedFormats - Allowed formats
     * @throws {AppError} - If format is invalid
     */
    validateFileFormat(format, allowedFormats) {
        if (!allowedFormats.includes(format.toLowerCase())) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `Invalid format. Allowed formats: ${allowedFormats.join(', ')}`
            );
        }
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

            // 3. Ensure user upload directory exists
            const userDir = await this.ensureUserUploadDir(uid);

            // 4. Generate filename with timestamp
            const filename = `avatar_${Date.now()}.${formatFile}`;
            const filepath = path.join(userDir, filename);

            // 5. Save file to disk
            await fs.writeFile(filepath, buffer);

            // 6. Generate file URL
            const fileUrl = `/api/file/${uid}/${filename}`;

            logger.info(`Avatar uploaded for user ${uid}: ${filename}`);

            return {
                filename,
                filepath,
                url: fileUrl,
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
     * Upload file for user
     * @param {string} uid - User ID
     * @param {Buffer} fileBuffer - File buffer
     * @param {string} originalName - Original filename
     * @param {string} fileType - File type/category (avatar, recipe, etc.)
     * @returns {Object} - { filename, filepath, url }
     */
    async uploadFile(uid, fileBuffer, originalName, fileType = 'file') {
        try {
            // 1. Extract file extension
            const ext = path.extname(originalName);
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx'];

            if (!allowedExtensions.includes(ext.toLowerCase())) {
                throw new AppError(
                    ErrorCodes.VALIDATION_INVALID_VALUE,
                    `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`
                );
            }

            // 2. Validate file size (10MB for general files)
            const maxSize = 10 * 1024 * 1024; // 10MB
            this.validateFileSize(fileBuffer, maxSize);

            // 3. Ensure user upload directory exists
            const userDir = await this.ensureUserUploadDir(uid);

            // 4. Generate unique filename
            const timestamp = Date.now();
            const filename = `${fileType}_${timestamp}${ext}`;
            const filepath = path.join(userDir, filename);

            // 5. Save file to disk
            await fs.writeFile(filepath, fileBuffer);

            // 6. Generate file URL
            const fileUrl = `/api/file/${uid}/${filename}`;

            logger.info(`File uploaded for user ${uid}: ${filename}`);

            return {
                filename,
                filepath,
                url: fileUrl,
                size: fileBuffer.length,
                originalName,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error uploading file:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to upload file');
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
            const filepath = path.join(this.getUserUploadDir(uid), filename);

            // Check if file exists
            try {
                await fs.access(filepath);
            } catch (error) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'File not found');
            }

            // Delete file
            await fs.unlink(filepath);

            logger.info(`File deleted for user ${uid}: ${filename}`);

            return {
                success: true,
                filename,
                deleted_at: new Date(),
            };

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
        return path.join(this.getUserUploadDir(uid), filename);
    }

    /**
     * Check if file exists
     * @param {string} uid - User ID
     * @param {string} filename - Filename
     * @returns {Promise<boolean>} - True if file exists
     */
    async fileExists(uid, filename) {
        try {
            const filepath = this.getFilePath(uid, filename);
            await fs.access(filepath);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get file info
     * @param {string} uid - User ID
     * @param {string} filename - Filename
     * @returns {Object} - File info (size, created, modified)
     */
    async getFileInfo(uid, filename) {
        try {
            const filepath = this.getFilePath(uid, filename);
            const stats = await fs.stat(filepath);

            return {
                filename,
                size: stats.size,
                created_at: stats.birthtime,
                modified_at: stats.mtime,
                url: `/api/file/${uid}/${filename}`,
            };

        } catch (error) {
            logger.error('Error getting file info:', error);
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'File not found');
        }
    }

    /**
     * List user files
     * @param {string} uid - User ID
     * @returns {Array} - List of files
     */
    async listUserFiles(uid) {
        try {
            const userDir = this.getUserUploadDir(uid);

            // Check if directory exists
            try {
                await fs.access(userDir);
            } catch (error) {
                return []; // No files if directory doesn't exist
            }

            const files = await fs.readdir(userDir);

            const fileInfos = await Promise.all(
                files.map(async (filename) => {
                    const filepath = path.join(userDir, filename);
                    const stats = await fs.stat(filepath);

                    return {
                        filename,
                        size: stats.size,
                        created_at: stats.birthtime,
                        modified_at: stats.mtime,
                        url: `/api/file/${uid}/${filename}`,
                    };
                })
            );

            return fileInfos;

        } catch (error) {
            logger.error('Error listing user files:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to list files');
        }
    }

    /**
     * Delete all user files
     * @param {string} uid - User ID
     * @returns {Object} - Success response with count
     */
    async deleteAllUserFiles(uid) {
        try {
            const userDir = this.getUserUploadDir(uid);

            // Check if directory exists
            try {
                await fs.access(userDir);
            } catch (error) {
                return { success: true, count: 0 }; // No files to delete
            }

            const files = await fs.readdir(userDir);

            // Delete all files
            await Promise.all(
                files.map(filename =>
                    fs.unlink(path.join(userDir, filename))
                )
            );

            // Optionally remove the directory
            await fs.rmdir(userDir);

            logger.info(`All files deleted for user ${uid}: ${files.length} files`);

            return {
                success: true,
                count: files.length,
                deleted_at: new Date(),
            };

        } catch (error) {
            logger.error('Error deleting all user files:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to delete all files');
        }
    }
}

module.exports = new FileService();

