const path = require('path');

exports.show = (req, res) => {
  const { id, filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', id, filename);
  res.sendFile(filePath);
};
