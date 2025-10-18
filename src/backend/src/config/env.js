require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL, // PostgreSQL
  MONGO_URI: process.env.MONGO_URI,       // MongoDB
  NODE_ENV: process.env.NODE_ENV || 'development',
};
