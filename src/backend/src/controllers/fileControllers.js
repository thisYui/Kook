const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');

exports.show = (req, res) => {
  try {
    const { id, filename } = req.params;

    if (!id || !filename) {
      return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Invalid path');
    }

    // ví dụ id = 'system', filename = 'default_avatar.png'
    const filePath = path.join(__dirname, '../..', 'uploads', id, filename);

    // kiểm tra file tồn tại
    if (!fs.existsSync(filePath)) {
      return ErrorResponse.send(res, ErrorCodes.NOT_FOUND, 'File not found');
    }

    res.sendFile(filePath);
  } catch (error) {
    logger.error('Error serving file:', error);
    return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
  }
};
