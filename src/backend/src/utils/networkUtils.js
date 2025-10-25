const os = require('os');
const logger = require('./logger');

/**
 * Lấy danh sách địa chỉ IP của máy (IPv4)
 * @returns {string[]} Mảng các địa chỉ IP
 */
function getLocalAddresses() {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Bỏ qua địa chỉ internal (127.0.0.1) và chỉ lấy IPv4
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }

  // Thêm localhost vào đầu danh sách
  if (!results.includes('127.0.0.1')) {
    results.unshift('127.0.0.1');
  }

  return results;
}

/**
 * In ra console các địa chỉ IP có thể truy cập
 * @param {number} port - Cổng server đang chạy
 */
function logServerAddresses(port) {
  const addrs = getLocalAddresses();
  logger.info('Available addresses:');
  addrs.forEach((ip) => {
    const label = ip === '127.0.0.1' ? 'Localhost' : 'LAN';
    logger.info(`  [${label}] http://${ip}:${port}`);
  });
}

module.exports = {
  getLocalAddresses,
  logServerAddresses,
};
