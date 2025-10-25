const { AppError, ErrorCodes } = require('./errorHandler');
const { SUPPORTED_LANGUAGES, SUPPORTED_THEMES } = require('../constants');

/**
 * Validation Utilities
 * Centralized validation functions
 */

class ValidateUtils {
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Invalid email format');
        }
        return true;
    }

    /**
     * Check if email format is valid (non-throwing version)
     * @param {string} email - Email to check
     * @returns {boolean} - True if valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @param {number} minLength - Minimum length (default: 8)
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validatePassword(password, minLength = 8) {
        if (!password || password.length < minLength) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `Password must be at least ${minLength} characters`
            );
        }
        return true;
    }

    /**
     * Validate password strength with complexity requirements
     * @param {string} password - Password to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateStrongPassword(password) {
        if (!password || password.length < 8) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                'Password must be at least 8 characters'
            );
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                'Password must contain at least one uppercase letter'
            );
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                'Password must contain at least one lowercase letter'
            );
        }

        // Check for at least one number
        if (!/[0-9]/.test(password)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                'Password must contain at least one number'
            );
        }

        return true;
    }

    /**
     * Validate language code
     * @param {string} language - Language code to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateLanguage(language) {
        if (!SUPPORTED_LANGUAGES.includes(language)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `Invalid language. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
            );
        }
        return true;
    }

    /**
     * Validate theme
     * @param {string} theme - Theme to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateTheme(theme) {
        if (!SUPPORTED_THEMES.includes(theme)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `Invalid theme. Supported themes: ${SUPPORTED_THEMES.join(', ')}`
            );
        }
        return true;
    }

    /**
     * Validate UUID format
     * @param {string} uuid - UUID to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateUUID(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(uuid)) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Invalid UUID format');
        }
        return true;
    }

    /**
     * Validate required fields
     * @param {Object} data - Data object
     * @param {Array<string>} requiredFields - Array of required field names
     * @returns {boolean} - True if all fields present
     * @throws {AppError} - If missing fields
     */
    validateRequiredFields(data, requiredFields) {
        const missingFields = [];

        for (const field of requiredFields) {
            if (data[field] === undefined || data[field] === null || data[field] === '') {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            throw new AppError(
                ErrorCodes.VALIDATION_MISSING_FIELD,
                `Missing required fields: ${missingFields.join(', ')}`
            );
        }

        return true;
    }

    /**
     * Validate string length
     * @param {string} value - String to validate
     * @param {number} minLength - Minimum length
     * @param {number} maxLength - Maximum length
     * @param {string} fieldName - Field name for error message
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateStringLength(value, minLength, maxLength, fieldName = 'Field') {
        if (typeof value !== 'string') {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, `${fieldName} must be a string`);
        }

        if (value.length < minLength) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `${fieldName} must be at least ${minLength} characters`
            );
        }

        if (value.length > maxLength) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `${fieldName} must not exceed ${maxLength} characters`
            );
        }

        return true;
    }

    /**
     * Validate number range
     * @param {number} value - Number to validate
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {string} fieldName - Field name for error message
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateNumberRange(value, min, max, fieldName = 'Field') {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, `${fieldName} must be a number`);
        }

        if (value < min || value > max) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `${fieldName} must be between ${min} and ${max}`
            );
        }

        return true;
    }

    /**
     * Validate URL format
     * @param {string} url - URL to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Invalid URL format');
        }
    }

    /**
     * Validate array
     * @param {Array} array - Array to validate
     * @param {number} minLength - Minimum length
     * @param {number} maxLength - Maximum length
     * @param {string} fieldName - Field name for error message
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateArray(array, minLength = 0, maxLength = Infinity, fieldName = 'Field') {
        if (!Array.isArray(array)) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, `${fieldName} must be an array`);
        }

        if (array.length < minLength) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `${fieldName} must contain at least ${minLength} items`
            );
        }

        if (array.length > maxLength) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `${fieldName} must not exceed ${maxLength} items`
            );
        }

        return true;
    }

    /**
     * Validate enum value
     * @param {*} value - Value to validate
     * @param {Array} allowedValues - Array of allowed values
     * @param {string} fieldName - Field name for error message
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateEnum(value, allowedValues, fieldName = 'Field') {
        if (!allowedValues.includes(value)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `${fieldName} must be one of: ${allowedValues.join(', ')}`
            );
        }
        return true;
    }

    /**
     * Validate file extension
     * @param {string} filename - Filename to validate
     * @param {Array<string>} allowedExtensions - Array of allowed extensions (e.g., ['.jpg', '.png'])
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateFileExtension(filename, allowedExtensions) {
        const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`
            );
        }

        return true;
    }

    /**
     * Validate date format (ISO 8601)
     * @param {string} dateString - Date string to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateDate(dateString) {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Invalid date format');
        }

        return true;
    }

    /**
     * Validate date is in the future
     * @param {string} dateString - Date string to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validateFutureDate(dateString) {
        this.validateDate(dateString);

        const date = new Date(dateString);
        const now = new Date();

        if (date <= now) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Date must be in the future');
        }

        return true;
    }

    /**
     * Validate date is in the past
     * @param {string} dateString - Date string to validate
     * @returns {boolean} - True if valid
     * @throws {AppError} - If invalid
     */
    validatePastDate(dateString) {
        this.validateDate(dateString);

        const date = new Date(dateString);
        const now = new Date();

        if (date >= now) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Date must be in the past');
        }

        return true;
    }

    /**
     * Sanitize string (remove HTML tags and trim)
     * @param {string} value - String to sanitize
     * @returns {string} - Sanitized string
     */
    sanitizeString(value) {
        if (typeof value !== 'string') {
            return '';
        }

        // Remove HTML tags
        const sanitized = value.replace(/<[^>]*>/g, '');

        // Trim whitespace
        return sanitized.trim();
    }

    /**
     * Validate and sanitize user input
     * @param {string} value - Value to validate and sanitize
     * @param {number} maxLength - Maximum length
     * @returns {string} - Sanitized value
     * @throws {AppError} - If invalid
     */
    validateAndSanitizeInput(value, maxLength = 1000) {
        if (typeof value !== 'string') {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Input must be a string');
        }

        const sanitized = this.sanitizeString(value);

        if (sanitized.length === 0) {
            throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Input cannot be empty');
        }

        if (sanitized.length > maxLength) {
            throw new AppError(
                ErrorCodes.VALIDATION_INVALID_VALUE,
                `Input must not exceed ${maxLength} characters`
            );
        }

        return sanitized;
    }

    /**
     * Validate user exists and is active
     * @param {Object} user - User object from repository
     * @throws {AppError} - If user is invalid, disabled, or deleted
     * @returns {Object} - User data if valid
     */
    validateUserActive(user) {
        if (!user) {
            throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
        }

        if (user.is_disabled) {
            throw new AppError(ErrorCodes.AUTH_ACCOUNT_DISABLED, 'Account is disabled');
        }

        if (user.is_deleted) {
            throw new AppError(ErrorCodes.USER_DELETED, 'Account has been deleted');
        }

        return user;
    }

    /**
     * Validate user ID and fetch user, then validate active status
     * @param {Function} findByIdFn - Repository function to find user by ID
     * @param {string} uid - User ID
     * @throws {AppError} - If user is invalid, disabled, or deleted
     * @returns {Object} - User data if valid
     */
    async validateUserActiveById(findByIdFn, uid) {
        const user = await findByIdFn(uid);
        return this.validateUserActive(user);
    }
}

module.exports = new ValidateUtils();
