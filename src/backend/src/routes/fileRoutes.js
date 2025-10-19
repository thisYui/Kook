const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileControllers');

router.get('/:id/:filename', fileController.show);

module.exports = router;
