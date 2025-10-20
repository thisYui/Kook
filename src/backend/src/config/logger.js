const winston = require('winston');
const path = require('path');
const { NODE_ENV } = require('./env');

// Định nghĩa các màu sắc cho log levels
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Format cho console (có màu sắc)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

// Format cho file (không có màu)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Tạo thư mục logs nếu chưa có
const logsDir = path.join(__dirname, '../../logs');

// Định nghĩa transports
const transports = [
  // Console output
  new winston.transports.Console({
    format: consoleFormat,
  }),

  // Error logs - chỉ ghi lỗi
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),

  // Combined logs - ghi tất cả
  new winston.transports.File({
    filename: path.join(logsDir, 'combined.log'),
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

// Tạo logger instance
const logger = winston.createLogger({
  level: NODE_ENV === 'development' ? 'debug' : 'info',
  levels: winston.config.npm.levels,
  transports,
  exitOnError: false,
});

// Helper methods để log request/response
logger.logRequest = (req) => {
  logger.http(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
};

logger.logResponse = (req, res, responseTime) => {
  logger.http(
    `${req.method} ${req.originalUrl} - ${res.statusCode} - ${responseTime}ms`
  );
};

logger.logError = (error, context = '') => {
  logger.error(`${context ? `[${context}] ` : ''}${error.message}`, {
    stack: error.stack,
    ...error,
  });
};

module.exports = logger;

