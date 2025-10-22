/**
 * Error Code Translations - English
 */

export const errorMessages = {
    // Authentication Errors (1000-1099)
    AUTH_1001: "Invalid email or password",
    AUTH_1002: "Email not found",
    AUTH_1003: "Account has been disabled",
    AUTH_1004: "Account not verified. Please check your email",
    AUTH_1005: "Invalid authentication token",
    AUTH_1006: "Authentication token has expired",
    AUTH_1007: "Invalid refresh token",
    AUTH_1008: "Refresh token has expired",
    AUTH_1009: "Email already exists",
    AUTH_1010: "Password is too weak. Must be at least 8 characters",
    AUTH_1011: "Passwords do not match",
    AUTH_1012: "Invalid OTP code",
    AUTH_1013: "OTP code has expired",
    AUTH_1014: "OTP code has already been used",
    AUTH_1015: "Too many login attempts. Please try again later",
    AUTH_1016: "Session has expired. Please login again",
    AUTH_1017: "Unauthorized access",
    AUTH_1018: "Current password is incorrect",
    AUTH_1019: "OTP resend request too soon. Please wait before requesting a new code",
    AUTH_1020: "Exceeded maximum OTP attempts. Please request a new code",

    // User Errors (1100-1199)
    USER_1101: "User not found",
    USER_1102: "Profile is incomplete",
    USER_1103: "Already following this user",
    USER_1104: "Not following this user",
    USER_1105: "Cannot follow yourself",
    USER_1106: "Invalid allergy information",

    // Post Errors (1200-1299)
    POST_1201: "Post not found",
    POST_1202: "You don't have permission to modify this post",
    POST_1203: "You have already rated this post",
    POST_1204: "Rating must be between 1 and 5",
    POST_1205: "Post title is required",
    POST_1206: "Post description is required",
    POST_1207: "Post tags are required",
    POST_1208: "At least one image is required",
    POST_1209: "Post already saved to notebook",
    POST_1210: "Post is not in your notebook",
    POST_1211: "Cannot repost your own post",
    POST_1212: "You have already reposted this",

    // Comment Errors (1300-1399)
    COMMENT_1301: "Comment not found",
    COMMENT_1302: "You don't have permission to modify this comment",
    COMMENT_1303: "Comment content is required",
    COMMENT_1304: "Comment is too long (max 500 characters)",

    // Recipe Errors (1400-1499)
    RECIPE_1401: "Recipe not found",
    RECIPE_1402: "Ingredients are required",
    RECIPE_1403: "Cooking steps are required",
    RECIPE_1404: "Invalid cooking time",
    RECIPE_1405: "Invalid number of servings",
    RECIPE_1406: "Invalid difficulty level. Must be: easy, medium, or hard",

    // Meal Plan Errors (1500-1599)
    MEAL_PLAN_1501: "Meal plan not found",
    MEAL_PLAN_1502: "You don't have permission to modify this meal plan",
    MEAL_PLAN_1503: "Invalid date format",
    MEAL_PLAN_1504: "Meal plan already exists for this date",

    // File/Upload Errors (1600-1699)
    FILE_1601: "File not found",
    FILE_1602: "File is too large (max 10MB)",
    FILE_1603: "Invalid file type",
    FILE_1604: "File upload failed",
    FILE_1605: "Invalid image format. Allowed: JPG, PNG, GIF",
    FILE_1606: "Image is too large (max 5MB)",

    // Search Errors (1700-1799)
    SEARCH_1701: "Search query is required",
    SEARCH_1702: "Search query is too short (min 2 characters)",
    SEARCH_1703: "No results found",

    // AI Errors (1800-1899)
    AI_1801: "AI service is temporarily unavailable",
    AI_1802: "Invalid AI request",
    AI_1803: "AI quota exceeded. Please try again later",
    AI_1804: "Image recognition failed",
    AI_1805: "Menu generation failed",
    AI_1806: "Nutrition analysis failed",

    // Notification Errors (1900-1999)
    NOTIFICATION_1901: "Notification not found",
    NOTIFICATION_1902: "Notification already marked as read",

    // Validation Errors (2000-2099)
    VALIDATION_2001: "Validation failed",
    VALIDATION_2002: "Invalid email format",
    VALIDATION_2003: "This field is required",
    VALIDATION_2004: "Field is too long",
    VALIDATION_2005: "Field is too short",
    VALIDATION_2006: "Invalid format",
    VALIDATION_2007: "Invalid value",

    // Server Errors (5000-5099)
    SERVER_5001: "Internal server error",
    SERVER_5002: "Database error",
    SERVER_5003: "External service error",
    SERVER_5004: "Request timeout",

    // Rate Limiting (4000-4099)
    RATE_4001: "Rate limit exceeded. Please slow down",
    RATE_4002: "Too many requests. Please try again later",

    // Generic
    UNKNOWN_ERROR: "An unknown error occurred",
};

