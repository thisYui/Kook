const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');

/**
 * File Utilities
 * Simple utilities for file operations
 */

class FileUtils {
    constructor() {
        this.uploadsDir = path.join(__dirname, '../../uploads');
    }

    /**
     * Save file to uploads directory
     * @param {string} filename - Name of the file
     * @param {Buffer|string} data - File data (Buffer or base64 string)
     * @param {string} subDir - Optional subdirectory (e.g., user ID)
     * @returns {Promise<Object>} - { success, filepath, url }
     */
    async saveFile(filename, data, subDir = '') {
        try {
            // Determine target directory
            const targetDir = subDir
                ? path.join(this.uploadsDir, subDir)
                : this.uploadsDir;

            // Ensure directory exists
            await fs.mkdir(targetDir, { recursive: true });

            // Full file path
            const filepath = path.join(targetDir, filename);

            // Convert data to Buffer if it's a base64 string
            const buffer = Buffer.isBuffer(data)
                ? data
                : Buffer.from(data, 'base64');

            // Write file
            await fs.writeFile(filepath, buffer);

            // Generate URL
            const url = subDir
                ? `/api/file/${subDir}/${filename}`
                : `/api/file/${filename}`;

            logger.info(`File saved: ${filepath}`);

            return {
                success: true,
                filepath,
                filename,
                url,
                size: buffer.length
            };

        } catch (error) {
            logger.error('Error saving file:', error);
            throw new Error(`Failed to save file: ${error.message}`);
        }
    }

    /**
     * Save file with auto-generated timestamp filename
     * @param {string} originalName - Original filename
     * @param {Buffer|string} data - File data
     * @param {string} subDir - Optional subdirectory
     * @returns {Promise<Object>} - { success, filepath, filename, url }
     */
    async saveFileWithTimestamp(originalName, data, subDir = '') {
        try {
            const ext = path.extname(originalName);
            const basename = path.basename(originalName, ext);
            const timestamp = Date.now();
            const filename = `${basename}_${timestamp}${ext}`;

            return await this.saveFile(filename, data, subDir);

        } catch (error) {
            logger.error('Error saving file with timestamp:', error);
            throw new Error(`Failed to save file: ${error.message}`);
        }
    }

    /**
     * Delete file from uploads directory
     * @param {string} filename - Name of the file
     * @param {string} subDir - Optional subdirectory
     * @returns {Promise<Object>} - { success, deleted_at }
     */
    async deleteFile(filename, subDir = '') {
        try {
            const filepath = subDir
                ? path.join(this.uploadsDir, subDir, filename)
                : path.join(this.uploadsDir, filename);

            // Check if file exists
            try {
                await fs.access(filepath);
            } catch (error) {
                throw new Error('File not found');
            }

            // Delete file
            await fs.unlink(filepath);

            logger.info(`File deleted: ${filepath}`);

            return {
                success: true,
                deleted_at: new Date()
            };

        } catch (error) {
            logger.error('Error deleting file:', error);
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    /**
     * Check if file exists
     * @param {string} filename - Name of the file
     * @param {string} subDir - Optional subdirectory
     * @returns {Promise<boolean>} - True if file exists
     */
    async fileExists(filename, subDir = '') {
        try {
            const filepath = subDir
                ? path.join(this.uploadsDir, subDir, filename)
                : path.join(this.uploadsDir, filename);

            await fs.access(filepath);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get file path
     * @param {string} filename - Name of the file
     * @param {string} subDir - Optional subdirectory
     * @returns {string} - Full file path
     */
    getFilePath(filename, subDir = '') {
        return subDir
            ? path.join(this.uploadsDir, subDir, filename)
            : path.join(this.uploadsDir, filename);
    }

    /**
     * Read file from uploads directory
     * @param {string} filename - Name of the file
     * @param {string} subDir - Optional subdirectory
     * @returns {Promise<Buffer>} - File buffer
     */
    async readFile(filename, subDir = '') {
        try {
            const filepath = this.getFilePath(filename, subDir);
            return await fs.readFile(filepath);
        } catch (error) {
            logger.error('Error reading file:', error);
            throw new Error(`Failed to read file: ${error.message}`);
        }
    }

    /**
     * Get file info
     * @param {string} filename - Name of the file
     * @param {string} subDir - Optional subdirectory
     * @returns {Promise<Object>} - File info
     */
    async getFileInfo(filename, subDir = '') {
        try {
            const filepath = this.getFilePath(filename, subDir);
            const stats = await fs.stat(filepath);

            return {
                filename,
                size: stats.size,
                created_at: stats.birthtime,
                modified_at: stats.mtime,
                is_file: stats.isFile(),
                is_directory: stats.isDirectory()
            };

        } catch (error) {
            logger.error('Error getting file info:', error);
            throw new Error(`Failed to get file info: ${error.message}`);
        }
    }

    /**
     * Ensure directory exists
     * @param {string} subDir - Subdirectory path
     * @returns {Promise<string>} - Directory path
     */
    async ensureDirectory(subDir) {
        const targetDir = path.join(this.uploadsDir, subDir);
        await fs.mkdir(targetDir, { recursive: true });
        return targetDir;
    }
}

module.exports = new FileUtils();

