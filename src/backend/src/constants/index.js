module.exports = {
  // OTP Constants
  OTP_LENGTH: 6,
  OTP_EXPIRE_TIME: 300, // 5 minutes in seconds
  OTP_MAX_ATTEMPTS: 5,
  OTP_RESEND_COOLDOWN: 60, // 1 minute in seconds

  // JWT Constants
  JWT_ACCESS_TOKEN_EXPIRE: '15m',
  JWT_REFRESH_TOKEN_EXPIRE: '7d',
  JWT_REMEMBER_ME_EXPIRE: '30d',

  // JWT Token Expiration in seconds (for calculation)
  JWT_ACCESS_TOKEN_EXPIRE_SECONDS: 3600, // 1 hour
  JWT_REFRESH_TOKEN_EXPIRE_SECONDS: 7 * 24 * 3600, // 7 days
  JWT_REMEMBER_ME_EXPIRE_SECONDS: 30 * 24 * 3600, // 30 days

  // Bcrypt
  BCRYPT_SALT_ROUNDS: 10,

  // Max Login Attempts
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_LOCK_TIME: 900, // 15 minutes in seconds

  // User Preferences
  SUPPORTED_LANGUAGES: ['vi', 'en'],
  SUPPORTED_THEMES: ['light', 'dark', 'system'],

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
};
