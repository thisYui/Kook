module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL, // PostgreSQL
  MONGODB_URI: process.env.MONGODB_URI,       // MongoDB
  NODE_ENV: process.env.NODE_ENV || 'development',
};