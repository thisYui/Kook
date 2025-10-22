require("dotenv").config({ path: "../.env" });
const express = require('express');
const cors = require('cors');
const { PORT, NODE_ENV } = require('./config/env');
const connectMongo = require('./config/mongo');
const prisma = require('./config/prisma');
const mongoose = require('mongoose');
const { logServerAddresses } = require('./utils/network');
const logger = require('./config/logger');
const { requestLogger, errorLogger, notFoundLogger } = require('./middleware/logger');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// Routes
const overviewRoutes = require('./routes/overviewRoutes');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Basic middleware
app.use(cors({ origin: true })); // allow all origins (use more restrictive policy in production)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware - log all requests
app.use(requestLogger);

// Route
app.use('/storage', fileRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ai', aiRoutes);

// 404 handler
app.use(notFoundLogger);

// Error handler middleware
app.use(errorHandlerMiddleware);

// Start function so we can await connections
const start = async () => {
  try {
    // Connect to databases (Mongo optional)
    await connectMongo();

    // Start server listening on all interfaces so it's reachable on LAN
    const port = Number(PORT) || 3000;
    const server = app.listen(port, '0.0.0.0', () => {
      logger.info('='.repeat(50));
      logger.info(`Server started successfully`);
      logger.info(`Environment: ${NODE_ENV}`);
      logger.info(`Port: ${port}`);
      logServerAddresses(port);
      logger.info('='.repeat(50));
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.warn(`Received ${signal}. Shutting down gracefully...`);
      server.close(async (err) => {
        if (err) {
          logger.error('Error closing server:', err);
          process.exit(1);
        }
        try {
          await prisma.$disconnect();
          logger.info('Prisma disconnected');
        } catch (e) {
          logger.warn('Error disconnecting prisma:', e);
        }
        try {
          if (mongoose.connection && mongoose.connection.readyState === 1) {
            await mongoose.connection.close(false);
            logger.info('MongoDB connection closed');
          }
        } catch (e) {
          logger.warn('Error closing mongoose connection:', e);
        }
        logger.info('Shutdown complete');
        process.exit(0);
      });

      // Force exit after timeout
      setTimeout(() => {
        logger.warn('Forcing shutdown');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('uncaughtException', (err) => {
      logger.error('Uncaught exception:', err);
      shutdown('uncaughtException');
    });
    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection:', reason);
      // try to shutdown gracefully
      shutdown('unhandledRejection');
    });

    return server;
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};

// If this file is run directly, start the server
if (require.main === module) {
  start();
}

module.exports = { app, start };
