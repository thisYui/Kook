import { useTranslation } from 'react-i18next';
import { errorMessages as enErrors } from '../locales/en/errors';
import { errorMessages as viErrors } from '../locales/vi/errors';

/**
 * Error Handler Utility for Frontend
 */

// Import error messages for fallback
const errorMessagesMap = {
    en: enErrors,
    vi: viErrors,
};

/**
 * Get translated error message by error code
 * @param {string} errorCode - Error code from backend
 * @param {string} language - Current language (en/vi)
 * @param {string} fallbackMessage - Fallback message if code not found
 * @returns {string} Translated error message
 */
export const getErrorMessage = (errorCode, language = 'en', fallbackMessage = null) => {
    const messages = errorMessagesMap[language] || errorMessagesMap.en;
    return messages[errorCode] || fallbackMessage || messages.UNKNOWN_ERROR;
};

/**
 * Custom hook to handle errors with i18n
 */
export const useErrorHandler = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    /**
     * Parse error from API response
     * @param {Error|Object} error - Error from API call
     * @returns {Object} Parsed error object
     */
    const parseError = (error) => {
        // Axios error response
        if (error.response?.data?.error) {
            const errorData = error.response.data.error;
            return {
                code: errorData.code,
                message: getErrorMessage(errorData.code, currentLanguage, errorData.message),
                details: errorData.details,
                statusCode: error.response.status,
            };
        }

        // Network error
        if (error.request && !error.response) {
            return {
                code: 'NETWORK_ERROR',
                message: currentLanguage === 'vi'
                    ? 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.'
                    : 'Cannot connect to server. Please check your network connection.',
                details: null,
                statusCode: 0,
            };
        }

        // Generic error
        return {
            code: 'UNKNOWN_ERROR',
            message: error.message || getErrorMessage('UNKNOWN_ERROR', currentLanguage),
            details: null,
            statusCode: 500,
        };
    };

    /**
     * Get error message from error code
     */
    const getMessage = (errorCode, fallback = null) => {
        return getErrorMessage(errorCode, currentLanguage, fallback);
    };

    /**
     * Display error notification (you can integrate with toast library)
     */
    const showError = (error, customMessage = null) => {
        const parsedError = parseError(error);
        const message = customMessage || parsedError.message;

        // You can integrate with react-toastify, sonner, or any notification library
        console.error('Error:', message, parsedError);

        return message;
    };

    return {
        parseError,
        getMessage,
        showError,
    };
};

/**
 * Error boundary component helper
 */
export class ErrorBoundary {
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    static getErrorMessage(error, language = 'en') {
        if (error.code) {
            return getErrorMessage(error.code, language);
        }
        return error.message || errorMessagesMap[language].UNKNOWN_ERROR;
    }
}

export default useErrorHandler;

