# Logger Documentation

## Tổng quan
Backend sử dụng **Winston** để logging với các tính năng:
- Log ra console với màu sắc
- Log ra file (error.log, combined.log)
- Tự động rotate file khi đạt dung lượng
- Log request/response tự động
- Log errors với stack trace 
- Hỗ trợ nhiều log levels

## Log Levels
- `error` - Lỗi nghiêm trọng (ghi vào error.log)
- `warn` - Cảnh báo
- `info` - Thông tin chung (default trong production)
- `http` - HTTP requests/responses
- `debug` - Debug information (chỉ trong development)

## Cách sử dụng

### 1. Import logger
```javascript
const logger = require('./config/logger');
// hoặc
const logger = require('./utils/logger');
```

### 2. Log cơ bản
```javascript
logger.info('Server started successfully');
logger.warn('Database connection slow');
logger.error('Failed to connect to database', error);
logger.debug('User data:', userData);
logger.http('GET /api/users');
```

### 3. Log Request/Response (Tự động)
Logger tự động log mọi HTTP request/response qua middleware:
```
2025-10-19 10:30:45 [http]: GET /api/users - IP: ::1
2025-10-19 10:30:45 [http]: GET /api/users - 200 - 45ms
```

### 4. Log Error với Context
```javascript
try {
  // Your code
} catch (error) {
  logger.logError(error, 'User Registration');
  // Output: [User Registration] Error message with stack trace
}
```

### 5. Trong Controllers/Routes
```javascript
router.post('/users', async (req, res, next) => {
  try {
    logger.info('Creating new user');
    const user = await createUser(req.body);
    logger.info(`User created successfully: ${user.id}`);
    res.json(user);
  } catch (error) {
    logger.logError(error, 'Create User');
    next(error); // Pass to error handler middleware
  }
});
```

## File Structure

### Logs Directory
```
src/backend/logs/
├── error.log      # Chỉ chứa errors
├── combined.log   # Chứa tất cả logs
└── .gitignore     # Ignore log files
```

### Configuration Files
```
src/backend/src/
├── config/
│   └── logger.js         # Logger configuration
├── middleware/
│   └── logger.js         # Request/error logging middleware
└── utils/
    └── logger.js         # Logger export helper
```

## Middleware Order (Quan trọng!)
```javascript
// 1. Basic middleware
app.use(cors());
app.use(express.json());

// 2. Request logger (trước routes)
app.use(requestLogger);

// 3. Routes
app.use('/api/users', userRoutes);

// 4. 404 handler (sau tất cả routes)
app.use(notFoundLogger);

// 5. Error handler (cuối cùng)
app.use(errorLogger);
```

## Error Handling

### Throw custom errors
```javascript
const error = new Error('User not found');
error.statusCode = 404;
throw error;
```

### Error middleware sẽ xử lý và log tự động
```javascript
// Error response format:
{
  "success": false,
  "error": {
    "message": "User not found",
    "stack": "..." // Chỉ trong development
  }
}
```

## Features

### 1. Colored Console Output
- Error: Đỏ
- Warn: Vàng
- Info: Xanh cyan
- HTTP: Magenta
- Debug: Trắng

### 2. File Rotation
- Max file size: 5MB
- Max files: 5 (giữ 5 file gần nhất)
- Tự động tạo file mới khi đạt limit

### 3. JSON Format trong File
Logs được ghi dưới dạng JSON để dễ parse:
```json
{
  "timestamp": "2025-10-19 10:30:45",
  "level": "error",
  "message": "Database connection failed",
  "stack": "Error: ...",
  "context": "MongoDB Connect"
}
```

## Environment Configuration

Logger tự động điều chỉnh theo môi trường:

### Development
- Log level: `debug` (log tất cả)
- Console: có màu sắc
- Error stack: hiển thị đầy đủ

### Production
- Log level: `info` (bỏ debug logs)
- Console: vẫn log
- Error stack: chỉ log vào file

## Best Practices

### DO
```javascript
logger.info('User logged in', { userId: user.id });
logger.error('Failed to send email', { to: email, error: err.message });
logger.logError(error, 'Payment Processing');
```

### DON'T
```javascript
console.log('User logged in'); // Không dùng console.log
logger.info(sensitiveData); // Không log dữ liệu nhạy cảm
logger.debug('Debug'); // Tránh log quá nhiều trong production
```

## Monitoring

### Xem logs real-time
```bash
# Xem tất cả logs
tail -f logs/combined.log

# Chỉ xem errors
tail -f logs/error.log

# Tìm kiếm trong logs
grep "error" logs/combined.log
```

## Troubleshooting

### Logger không hoạt động?
1. Kiểm tra thư mục `logs/` đã được tạo
2. Kiểm tra quyền ghi file
3. Kiểm tra middleware order trong index.js

### Không thấy logs trong file?
- Kiểm tra log level trong config
- Kiểm tra NODE_ENV
- Logs được buffer, đợi một chút hoặc flush

### Quá nhiều logs?
- Tăng log level lên `warn` hoặc `error`
- Giảm maxFiles trong config
- Thêm filter trong winston config

