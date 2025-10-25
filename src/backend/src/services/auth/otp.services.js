const NodeCache = require('node-cache');
const crypto = require('crypto');
const { 
  OTP_LENGTH, 
  OTP_EXPIRE_TIME, 
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN 
} = require('../../constants');
const { AppError } = require('../../utils/errorHandler');
const { ErrorCodes } = require('../../constants/errorCodes');

// Initialize cache với TTL mặc định
const otpCache = new NodeCache({ 
  stdTTL: OTP_EXPIRE_TIME,
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false
});

// Cache để lưu thông tin resend cooldown
const resendCache = new NodeCache({
  stdTTL: OTP_RESEND_COOLDOWN,
  checkperiod: 30
});

// Cache để đếm số lần thử sai
const attemptCache = new NodeCache({
  stdTTL: OTP_EXPIRE_TIME,
  checkperiod: 60
});

/**
 * Generate random OTP code
 * @param {number} length - Length of OTP
 * @returns {string} OTP code
 */
const generateOTP = (length = OTP_LENGTH) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }
  
  return otp;
};

/**
 * Create and store OTP for user
 * @param {string} identifier - Email or UID (chưa verify)
 * @param {Object} options - Additional options
 * @returns {Object} OTP info
 */
const createOTP = (identifier, options = {}) => {
  // Kiểm tra resend cooldown
  if (resendCache.has(identifier)) {
    const remainingTime = resendCache.getTtl(identifier);
    const secondsLeft = Math.ceil((remainingTime - Date.now()) / 1000);
    throw new AppError(
      ErrorCodes.AUTH_OTP_RESEND_TOO_SOON,
      'OTP resend too soon. Please wait before requesting a new OTP.',
      422,
      { seconds_left: secondsLeft }
    );
  }

  // Generate OTP
  const otp = generateOTP(options.length || OTP_LENGTH);
  const expireTime = options.expireTime || OTP_EXPIRE_TIME;
  
  // Lưu OTP vào cache
  const otpData = {
    code: otp,
    created_at: Date.now(),
    expire_at: Date.now() + (expireTime * 1000),
    identifier,
    verified: false
  };
  
  otpCache.set(identifier, otpData, expireTime);
  
  // Set resend cooldown
  resendCache.set(identifier, true, OTP_RESEND_COOLDOWN);
  
  // Reset attempt counter
  attemptCache.del(identifier);
  
  return {
    otp,
    expire_at: otpData.expire_at,
    expires_in: expireTime
  };
};

/**
 * Verify OTP code
 * @param {string} identifier - Email or UID
 * @param {string} code - OTP code to verify
 * @returns {boolean} Verification result
 */
const verifyOTP = (identifier, code) => {
  // Get OTP data
  const otpData = otpCache.get(identifier);
  
  if (!otpData) {
    throw new AppError(
      ErrorCodes.AUTH_OTP_EXPIRED,
      'OTP has expired or does not exist.',
      422
    );
  }
  
  // Check attempts
  const attempts = attemptCache.get(identifier) || 0;
  if (attempts >= OTP_MAX_ATTEMPTS) {
    otpCache.del(identifier);
    attemptCache.del(identifier);
    throw new AppError(
      ErrorCodes.AUTH_OTP_MAX_ATTEMPTS,
      'Maximum OTP verification attempts exceeded.',
      429
    );
  }
  
  // Verify code
  if (otpData.code !== code) {
    // Increment attempt counter
    attemptCache.set(identifier, attempts + 1, OTP_EXPIRE_TIME);
    
    const remainingAttempts = OTP_MAX_ATTEMPTS - attempts - 1;
    throw new AppError(
      ErrorCodes.AUTH_OTP_INVALID,
      'Invalid OTP code.',
      422,
      { remaining_attempts: remainingAttempts }
    );
  }
  
  // Mark as verified and remove from cache
  otpCache.del(identifier);
  attemptCache.del(identifier);
  resendCache.del(identifier);
  
  return true;
};

/**
 * Get OTP info (for debugging or display)
 * @param {string} identifier - Email or UID
 * @returns {Object|null} OTP info without code
 */
const getOTPInfo = (identifier) => {
  const otpData = otpCache.get(identifier);
  
  if (!otpData) {
    return null;
  }
  
  const now = Date.now();
  const remainingTime = Math.ceil((otpData.expire_at - now) / 1000);
  const attempts = attemptCache.get(identifier) || 0;
  
  return {
    exists: true,
    expires_in: remainingTime > 0 ? remainingTime : 0,
    attempts_left: OTP_MAX_ATTEMPTS - attempts,
    can_resend: !resendCache.has(identifier)
  };
};

/**
 * Delete OTP (for cleanup or cancel)
 * @param {string} identifier - Email or UID
 * @returns {boolean} Success status
 */
const deleteOTP = (identifier) => {
  otpCache.del(identifier);
  attemptCache.del(identifier);
  resendCache.del(identifier);
  return true;
};

/**
 * Check if can resend OTP
 * @param {string} identifier - Email or UID
 * @returns {Object} Resend status
 */
const canResendOTP = (identifier) => {
  if (resendCache.has(identifier)) {
    const remainingTime = resendCache.getTtl(identifier);
    const secondsLeft = Math.ceil((remainingTime - Date.now()) / 1000);
    return {
      can_resend: false,
      seconds_left: secondsLeft
    };
  }
  
  return {
    can_resend: true,
    seconds_left: 0
  };
};

/**
 * Get cache statistics (for monitoring)
 * @returns {Object} Cache stats
 */
const getStats = () => {
  return {
    otp_cache: otpCache.getStats(),
    resend_cache: resendCache.getStats(),
    attempt_cache: attemptCache.getStats()
  };
};

module.exports = {
  generateOTP,
  createOTP,
  verifyOTP,
  getOTPInfo,
  deleteOTP,
  canResendOTP,
  getStats
};
