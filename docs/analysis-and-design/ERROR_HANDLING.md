# Error Handling System Documentation

## 📚 Tổng quan

Hệ thống quản lý lỗi hoàn chỉnh với mã lỗi chuẩn hóa và hỗ trợ đa ngôn ngữ (i18n).

## 🎯 Flow xử lý lỗi

```
Backend Error → Error Code → Frontend → i18n Translation → Display
```

## 🔧 Backend

### 1. Error Codes (`errorCodes.js`)

Định nghĩa tất cả mã lỗi chuẩn:

```javascript
const { ErrorCodes } = require('../utils/errorCodes');

ErrorCodes.AUTH_INVALID_CREDENTIALS  // 'AUTH_1001'
ErrorCodes.POST_NOT_FOUND            // 'POST_1201'
ErrorCodes.FILE_TOO_LARGE            // 'FILE_1602'
```

**Phân loại mã lỗi:**
- `AUTH_1xxx` - Authentication errors
- `USER_1xxx` - User errors
- `POST_1xxx` - Post errors
- `COMMENT_1xxx` - Comment errors
- `RECIPE_1xxx` - Recipe errors
- `MEAL_PLAN_1xxx` - Meal plan errors
- `FILE_1xxx` - File upload errors
- `SEARCH_1xxx` - Search errors
- `AI_1xxx` - AI service errors
- `VALIDATION_2xxx` - Validation errors
- `RATE_4xxx` - Rate limiting errors
- `SERVER_5xxx` - Server errors

### 2. Error Handler (`errorHandler.js`)

```javascript
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');

// Send error with code
ErrorResponse.send(res, ErrorCodes.AUTH_INVALID_CREDENTIALS);

// Send error with custom message
ErrorResponse.send(res, ErrorCodes.POST_NOT_FOUND, 'Custom message');

// Send error with details
ErrorResponse.send(res, ErrorCodes.VALIDATION_FAILED, 'Validation failed', {
    field: 'email',
    reason: 'Invalid format'
});

// Quick methods
ErrorResponse.sendUnauthorized(res);
ErrorResponse.sendNotFound(res);
ErrorResponse.sendServerError(res, error);
ErrorResponse.sendValidationError(res, errors);
```

### 3. Sử dụng trong Controller

```javascript
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.VALIDATION_REQUIRED_FIELD
            );
        }

        // Check user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.AUTH_EMAIL_NOT_FOUND
            );
        }

        // Check password
        if (!isValidPassword) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.AUTH_INVALID_CREDENTIALS
            );
        }

        // Success response
        res.json({
            success: true,
            data: { token, user }
        });

    } catch (error) {
        return ErrorResponse.sendServerError(res, error);
    }
}
```

### 4. Response Format

**Error Response:**
```json
{
    "success": false,
    "error": {
        "code": "AUTH_1001",
        "message": "Invalid email or password",
        "details": null
    }
}
```

**Success Response:**
```json
{
    "success": true,
    "data": {
        "token": "...",
        "user": {...}
    }
}
```

## 🎨 Frontend

### 1. Error Handler Hook (`useErrorHandler`)

```javascript
import { useErrorHandler } from '@/utils/errorHandler';

function MyComponent() {
    const { parseError, getMessage, showError } = useErrorHandler();

    const handleLogin = async () => {
        try {
            await authApi.login(email, password);
        } catch (error) {
            // Parse error
            const parsedError = parseError(error);
            console.log(parsedError.code);      // 'AUTH_1001'
            console.log(parsedError.message);   // Translated message
            console.log(parsedError.statusCode); // 401

            // Or show error directly
            showError(error);
        }
    };

    // Get message by code
    const errorMessage = getMessage('AUTH_1001');
}
```

### 2. Error Translations

**English (`en/errors.js`):**
```javascript
AUTH_1001: "Invalid email or password"
POST_1201: "Post not found"
FILE_1602: "File is too large (max 10MB)"
```

**Vietnamese (`vi/errors.js`):**
```javascript
AUTH_1001: "Email hoặc mật khẩu không đúng"
POST_1201: "Không tìm thấy bài viết"
FILE_1602: "File quá lớn (tối đa 10MB)"
```

### 3. Error Boundary Component

```javascript
import ErrorBoundary from '@/components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <YourApp />
        </ErrorBoundary>
    );
}

// With custom fallback
<ErrorBoundary 
    fallback={(error, reset) => (
        <CustomErrorUI error={error} onReset={reset} />
    )}
>
    <YourApp />
</ErrorBoundary>
```

## 💡 Ví dụ thực tế

### Backend Example: Login với error handling

```javascript
// authControllers.js
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.VALIDATION_REQUIRED_FIELD,
                'Email and password are required'
            );
        }

        // 2. Find user
        const user = await prisma.user.findUnique({ 
            where: { email } 
        });
        
        if (!user) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.AUTH_EMAIL_NOT_FOUND
            );
        }

        // 3. Check account status
        if (!user.is_verified) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.AUTH_ACCOUNT_NOT_VERIFIED
            );
        }

        if (user.is_disabled) {
            return ErrorResponse.send(
                res, 
                ErrorCodes.AUTH_ACCOUNT_DISABLED
            );
        }

        // 4. Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            // Rate limiting check
            const attempts = await checkLoginAttempts(user.id);
            if (attempts > 5) {
                return ErrorResponse.send(
                    res, 
                    ErrorCodes.AUTH_TOO_MANY_ATTEMPTS
                );
            }

            return ErrorResponse.send(
                res, 
                ErrorCodes.AUTH_INVALID_CREDENTIALS
            );
        }

        // 5. Generate token
        const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);

        // 6. Success
        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        });

    } catch (error) {
        logger.error('Login error:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}
```

### Frontend Example: Login với error handling

```javascript
// LoginPage.jsx
import { useState } from 'react';
import { useErrorHandler } from '@/utils/errorHandler';
import { authApi } from '@/api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { parseError, showError } = useErrorHandler();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authApi.login(email, password);
            
            if (response.success) {
                // Success - redirect
                window.location.href = '/';
            }

        } catch (err) {
            // Parse error
            const parsedError = parseError(err);
            
            // Set error message (already translated)
            setError(parsedError.message);

            // Different handling based on error code
            switch (parsedError.code) {
                case 'AUTH_1001': // Invalid credentials
                    // Highlight password field
                    break;
                case 'AUTH_1004': // Not verified
                    // Show verify email button
                    break;
                case 'AUTH_1015': // Too many attempts
                    // Disable form for 5 minutes
                    break;
            }

            // Or use showError for toast notification
            showError(err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    );
}
```

## 📋 Danh sách mã lỗi đầy đủ

### Authentication (1000-1099)
- `AUTH_1001` - Invalid credentials
- `AUTH_1002` - Email not found
- `AUTH_1003` - Account disabled
- `AUTH_1004` - Account not verified
- `AUTH_1005` - Invalid token
- `AUTH_1006` - Token expired
- `AUTH_1009` - Email already exists
- `AUTH_1012` - Invalid OTP
- `AUTH_1015` - Too many attempts

### Posts (1200-1299)
- `POST_1201` - Post not found
- `POST_1202` - Unauthorized
- `POST_1203` - Already rated
- `POST_1205` - Title required
- `POST_1209` - Already saved

### Files (1600-1699)
- `FILE_1602` - File too large
- `FILE_1603` - Invalid file type
- `FILE_1605` - Invalid image format

### Validation (2000-2099)
- `VALIDATION_2001` - Validation failed
- `VALIDATION_2002` - Invalid email
- `VALIDATION_2003` - Required field

### Server (5000-5099)
- `SERVER_5001` - Internal error
- `SERVER_5002` - Database error

## 🎨 Best Practices

1. **Always use error codes** - Không hardcode message
2. **Log errors** - Sử dụng logger để track
3. **Parse errors** - Dùng `parseError()` để xử lý
4. **Show user-friendly messages** - Dùng i18n translations
5. **Handle specific errors** - Switch case cho từng error code
6. **Use Error Boundary** - Bắt React errors

## 🚀 Migration từ code cũ

```javascript
// CŨ - Hardcoded message
res.status(401).json({ message: 'Invalid credentials' });

// MỚI - Sử dụng error code
ErrorResponse.send(res, ErrorCodes.AUTH_INVALID_CREDENTIALS);
```

```javascript
// CŨ - Frontend hardcoded
if (error.response.status === 401) {
    setError('Đăng nhập thất bại');
}

// MỚI - Sử dụng parseError
const parsedError = parseError(error);
setError(parsedError.message); // Auto translated
```

