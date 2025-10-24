const path = require('path');
const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');

exports.show = (req, res) => {
  try {
    const { id, filename } = req.params;

    // Validate input
    if (!id) {
      return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID is required');
    }
    if (!filename) {
      return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Filename is required');
    }

    const filePath = path.join(__dirname, '..', 'uploads', id, filename);
    res.sendFile(filePath);
  } catch (error) {
    logger.error('Error serving file:', error);
    return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
  }
};
