# API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 1. Authentication APIs (`/api/auth`)

### 1.1. Đăng nhập
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean (optional, default: false)"
}
```

**Response (rememberMe = true):**
```json
{
  "success": true,
  "uid": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "avatar_url": "string",
    "language": "string",
    "theme": "string",
    "bio": "string",
    "role": "string",
    "is_verified": "boolean",
    "is_disabled": "boolean"
  },
  "remember_me": true,
  "token": "string",
  "refresh_token": "string",
  "expires_in": "number (seconds)"
}
```

**Response (rememberMe = false):**
```json
{
  "success": true,
  "uid": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "avatar_url": "string",
    "language": "string",
    "theme": "string",
    "bio": "string",
    "role": "string",
    "is_verified": "boolean",
    "is_disabled": "boolean"
  },
  "remember_me": false
}
```

**Note:** 
- Khi `rememberMe = true`, backend sẽ trả về token để lưu vào localStorage
- Khi `rememberMe = false`, backend KHÔNG trả về token, chỉ session-based authentication

---

### 1.2. Đăng ký
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "fullName": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful! Please check your email for OTP.",
  "data": {
    "email": "string",
    "expires_in": "number (seconds)"
  }
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Special characters recommended (but not required)

---

### 1.3. Xác nhận OTP
**Endpoint:** `POST /api/auth/confirm`

**Request Body:**
```json
{
  "email": "string",
  "otp": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully!",
  "data": {
    "uid": "string",
    "token": "string",
    "refresh_token": "string",
    "expires_in": "number (seconds)",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "avatar_url": "string"
    }
  }
}
```

**Note:** Sau khi xác nhận OTP thành công, user sẽ được tự động đăng nhập và nhận token

---

### 1.4. Gửi lại OTP
**Endpoint:** `POST /api/auth/send-otp`

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully!",
  "data": {
    "expires_in": "number (seconds)"
  }
}
```

**Rate Limiting:**
- Chỉ có thể gửi lại OTP sau mỗi 60 giây
- Nếu request quá nhanh, sẽ nhận error code `AUTH_OTP_RESEND_TOO_SOON`

---

### 1.5. Xác thực token
**Endpoint:** `POST /api/auth/verify-token`

**Request Body:**
```json
{
  "token": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token hợp lệ!",
  "data": {
    "uid": "string",
    "jti": "string",
    "iat": "number",
    "exp": "number"
  }
}
```

---

### 1.6. Làm mới token
**Endpoint:** `POST /api/auth/refresh-token`

**Request Body:**
```json
{
  "token": "string (refresh token)",
  "device": "string (optional)",
  "user_agent": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully!",
  "data": {
    "token": "string (new access token)",
    "expires_in": "number (seconds)"
  }
}
```

**Note:** 
- Refresh token được sử dụng để lấy access token mới khi access token hết hạn
- Không trả về refresh token mới, vẫn sử dụng refresh token cũ

---

### 1.7. Đăng xuất
**Endpoint:** `POST /api/auth/logout`

**Request Body:**
```json
{
  "token": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully!"
}
```

**Note:** 
- Nếu có token, backend sẽ revoke token đó (thêm vào blacklist)
- Nếu không có token (session-based), vẫn trả về success
- Luôn trả về success code 200 để UX tốt hơn, ngay cả khi token invalid

---

### ~~1.5. Đặt lại mật khẩu~~ (Chưa hoàn thành)
**Status:** Not implemented yet

---

### ~~1.6. Đổi email~~ (Chưa hoàn thành)
**Status:** Not implemented yet

---

### ~~1.7. Đổi mật khẩu~~ (Chưa hoàn thành)
**Status:** Not implemented yet

---

### ~~1.8. Đổi avatar~~ (Chưa hoàn thành)
**Status:** Not implemented yet

---

## 2. User APIs (`/api/users`)

**Note:** Tất cả các API trong section này đều yêu cầu authentication token trong header (trừ một số API đã được đánh dấu):
```
Authorization: Bearer <token>
```

---

### 2.1. Đổi ngôn ngữ
**Endpoint:** `POST /api/users/change-lang`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "language": "en | vi"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "string",
    "language": "string"
  }
}
```

**Supported Languages:**
- `en` - English
- `vi` - Tiếng Việt

---

### 2.2. Đổi giao diện
**Endpoint:** `POST /api/users/change-theme`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "theme": "light | dark | system"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "string",
    "theme": "string"
  }
}
```

**Supported Themes:**
- `light` - Giao diện sáng
- `dark` - Giao diện tối
- `system` - Theo hệ thống

---

### 2.3. Lấy danh sách dị ứng của người dùng
**Endpoint:** `POST /api/users/allergies`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "allergies": [
      {
        "ingredient_key": "string",
        "ingredient_name": "string",
        "added_at": "datetime"
      }
    ]
  }
}
```

---

### 2.4. Thêm dị ứng
**Endpoint:** `POST /api/users/add-allergy`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "ingredient_key": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ingredient_key": "string",
    "message": "Allergy added successfully"
  }
}
```

---

### 2.5. Xóa dị ứng
**Endpoint:** `DELETE /api/users/delete-allergy`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "ingredient_key": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Allergy deleted successfully"
  }
}
```

---

### 2.6. Lấy thông tin hồ sơ người dùng
**Endpoint:** `POST /api/users/get-profile`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "senderID": "string"
}
```

**Parameters:**
- `uid`: ID của người dùng cần xem profile
- `senderID`: ID của người đang xem (current user)

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "string",
    "name": "string",
    "email": "string",
    "avatar_url": "string",
    "bio": "string",
    "role": "string",
    "is_verified": "boolean",
    "created_at": "datetime",
    "stats": {
      "posts_count": "number",
      "followers_count": "number",
      "following_count": "number"
    },
    "is_following": "boolean"
  }
}
```

---

### 2.7. Đánh dấu thông báo đã xem
**Endpoint:** `POST /api/users/seen-notifications`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "notificationID": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Notification marked as seen"
  }
}
```

---

### 2.8. Xóa tài khoản (Soft delete)
**Endpoint:** `DELETE /api/users/delete-account`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "token": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Account deleted successfully"
  }
}
```

**Note:** 
- Đây là soft delete, tài khoản sẽ được đánh dấu `is_deleted = true`
- Dữ liệu vẫn được giữ lại trong database
- Người dùng không thể đăng nhập lại sau khi xóa tài khoản
- Token sẽ bị revoke

---

### 2.9. Đặt lại mật khẩu
**Endpoint:** `POST /api/users/reset-password`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "newPassword": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Password reset successfully"
  }
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- Special characters recommended

---

### 2.10. Đổi email
**Endpoint:** `POST /api/users/change-email`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "newEmail": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": "string",
    "email": "string",
    "message": "Email changed successfully"
  }
}
```

**Note:** 
- Email mới phải chưa được sử dụng trong hệ thống
- Email phải đúng định dạng (example@domain.com)

---

### 2.11. Đổi avatar
**Endpoint:** `POST /api/users/change-avatar`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "avatarData": "base64_string",
  "formatFile": "jpg | png | jpeg | webp"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đổi avatar thành công!",
  "data": {
    "avatar_url": "string"
  }
}
```

**Supported Formats:**
- `jpg`, `jpeg`
- `png`
- `webp`

**File Size Limit:** 5MB

**Note:**
- Avatar được lưu trong thư mục: `uploads/:uid/avatar/`
- Tên file tự động tạo với timestamp

---

### 2.12. Hiển thị sổ tay (Saved posts)
**Endpoint:** `POST /api/users/show-notebook`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "limit": "number (optional, default: 20)",
  "offset": "number (optional, default: 0)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "post_id": "string",
        "title": "string",
        "thumbnail": "string",
        "author": {
          "uid": "string",
          "name": "string",
          "avatar_url": "string"
        },
        "saved_at": "datetime",
        "rating": "number",
        "views_count": "number"
      }
    ],
    "total": "number",
    "limit": "number",
    "offset": "number"
  }
}
```

---

### 2.13. Xem danh sách kế hoạch bữa ăn (Overview)
**Endpoint:** `POST /api/users/overview-meal-plans`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "limit": "number (optional, default: 20)",
  "offset": "number (optional, default: 0)",
  "activeOnly": "boolean (optional, default: false)"
}
```

**Parameters:**
- `activeOnly`: Nếu `true`, chỉ lấy các meal plan đang active

**Response:**
```json
{
  "success": true,
  "data": {
    "mealPlans": [
      {
        "meal_plan_id": "string",
        "week_start_date": "date",
        "is_active": "boolean",
        "created_at": "datetime",
        "total_meals": "number"
      }
    ],
    "total": "number",
    "limit": "number",
    "offset": "number"
  }
}
```

---

### 2.14. Xem chi tiết kế hoạch bữa ăn
**Endpoint:** `POST /api/users/show-meal-plans`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "mealPlanID": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "meal_plan_id": "string",
    "user_id": "string",
    "week_start_date": "date",
    "is_active": "boolean",
    "created_at": "datetime",
    "meals": [
      {
        "day": "monday | tuesday | wednesday | thursday | friday | saturday | sunday",
        "meal_type": "breakfast | lunch | dinner | snack",
        "recipe_id": "string",
        "recipe_title": "string",
        "recipe_thumbnail": "string",
        "servings": "number"
      }
    ]
  }
}
```

---

### 2.15. Follow người dùng
**Endpoint:** `POST /api/users/follow`

**Authentication:** Required

**Request Body:**
```json
{
  "follower_id": "string",
  "followee_id": "string"
}
```

**Parameters:**
- `follower_id`: ID của người theo dõi (current user)
- `followee_id`: ID của người được theo dõi

**Response:**
```json
{
  "success": true,
  "message": "Followed user successfully",
  "data": {
    "follower_id": "string",
    "followee_id": "string",
    "followed_at": "datetime"
  }
}
```

**Note:** 
- Không thể follow chính mình
- Nếu đã follow trước đó, sẽ trả về lỗi

---

### 2.16. Unfollow người dùng
**Endpoint:** `POST /api/users/unfollow`

**Authentication:** Required

**Request Body:**
```json
{
  "follower_id": "string",
  "followee_id": "string"
}
```

**Parameters:**
- `follower_id`: ID của người theo dõi (current user)
- `followee_id`: ID của người muốn unfollow

**Response:**
```json
{
  "success": true,
  "message": "Unfollowed user successfully",
  "data": {
    "follower_id": "string",
    "followee_id": "string"
  }
}
```

---

### 2.17. Lấy danh sách người theo dõi (Followers)
**Endpoint:** `POST /api/users/list-followers`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "limit": "number (optional, default: 20)",
  "offset": "number (optional, default: 0)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "followers": [
      {
        "uid": "string",
        "name": "string",
        "avatar_url": "string",
        "bio": "string",
        "is_verified": "boolean",
        "followed_at": "datetime",
        "is_following_back": "boolean"
      }
    ],
    "total": "number",
    "limit": "number",
    "offset": "number"
  }
}
```

---

### 2.18. Lấy danh sách đang theo dõi (Following)
**Endpoint:** `POST /api/users/list-following`

**Authentication:** Required

**Request Body:**
```json
{
  "uid": "string",
  "limit": "number (optional, default: 20)",
  "offset": "number (optional, default: 0)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "following": [
      {
        "uid": "string",
        "name": "string",
        "avatar_url": "string",
        "bio": "string",
        "is_verified": "boolean",
        "followed_at": "datetime",
        "is_following_back": "boolean"
      }
    ],
    "total": "number",
    "limit": "number",
    "offset": "number"
  }
}
```

---

## 3. Post APIs (`/api/post`)

### 3.1. Tạo bài viết mới
**Endpoint:** `POST /api/post/post`

**Request Body:**
```json
{
  "uid": "string",
  "title": "string",
  "description": "string",
  "images": ["base64_string"],
  "tags": ["string"],
  "countryCode": "string",
  "recipeData": {
    "ingredients": [
      {
        "name": "string",
        "quantity": "string",
        "unit": "string"
      }
    ],
    "steps": [
      {
        "stepNumber": "number",
        "description": "string",
        "imageUrl": "string"
      }
    ],
    "cookingTime": "number",
    "servings": "number",
    "difficulty": "easy | medium | hard"
  }
}
```

**Response:**
```json
{
  "message": "Tạo bài viết thành công!",
  "post": {
    "postId": "string",
    "title": "string",
    "createdAt": "datetime"
  }
}
```

---

### 3.2. Đánh giá bài viết
**Endpoint:** `POST /api/post/rating-post`

**Request Body:**
```json
{
  "uid": "string",
  "postID": "string",
  "rating": "number (1-5)"
}
```

**Response:**
```json
{
  "message": "Đánh giá bài viết thành công!"
}
```

---

### 3.3. Bình luận bài viết
**Endpoint:** `POST /api/post/new-comment-post`

**Request Body:**
```json
{
  "uid": "string",
  "postID": "string",
  "content": "string"
}
```

**Response:**
```json
{
  "message": "Bình luận thành công!",
  "comment": {
    "commentId": "string",
    "content": "string",
    "createdAt": "datetime"
  }
}
```

---

### 3.4. Xóa bình luận
**Endpoint:** `POST /api/post/delete-comment`

**Request Body:**
```json
{
  "uid": "string",
  "commentId": "string"
}
```

**Response:**
```json
{
  "message": "Xóa bình luận thành công!"
}
```

---

### 3.5. Xóa bài viết
**Endpoint:** `POST /api/post/delete-post`

**Request Body:**
```json
{
  "uid": "string",
  "postID": "string"
}
```

**Response:**
```json
{
  "message": "Xóa bài viết thành công!"
}
```

---

## 4. Search APIs (`/api/search`)

### 4.1. Tìm kiếm theo nguyên liệu
**Endpoint:** `POST /api/search/search-by-ingredient`

**Request Body:**
```json
{
  "ingredientID": "string (optional)",
  "text": "string (optional)"
}
```

**Note:** Một trong hai trường `ingredientID` hoặc `text` phải được cung cấp.

**Response:**
```json
{
  "message": "Tìm kiếm theo nguyên liệu thành công!",
  "recipes": [
    {
      "postId": "string",
      "title": "string",
      "thumbnail": "string",
      "rating": "number"
    }
  ]
}
```

---

### 4.2. Tìm kiếm theo tên người dùng
**Endpoint:** `POST /api/search/search-by-user-name`

**Request Body:**
```json
{
  "username": "string"
}
```

**Response:**
```json
{
  "message": "Tìm kiếm người dùng thành công!",
  "users": [
    {
      "uid": "string",
      "fullName": "string",
      "avatarUrl": "string",
      "followersCount": "number"
    }
  ]
}
```

---

### 4.3. Tìm kiếm theo tiêu đề
**Endpoint:** `POST /api/search/search-by-title`

**Request Body:**
```json
{
  "title": "string"
}
```

**Response:**
```json
{
  "message": "Tìm kiếm theo tiêu đề thành công!",
  "posts": [
    {
      "postId": "string",
      "title": "string",
      "thumbnail": "string",
      "authorName": "string",
      "rating": "number"
    }
  ]
}
```

---

## 5. AI APIs (`/api/ai`)

### 5.1. Tạo thực đơn tuần
**Endpoint:** `POST /api/ai/generate-menu-week`

**Request Body:**
```json
{
  "uid": "string",
  "preferences": {
    "cuisineType": ["string"],
    "dietType": "string",
    "calorieTarget": "number"
  },
  "dietaryRestrictions": ["string"]
}
```

**Response:**
```json
{
  "message": "Tạo thực đơn tuần thành công!",
  "mealPlan": {
    "mealPlanId": "string",
    "weekStartDate": "date",
    "meals": [
      {
        "day": "string",
        "breakfast": {},
        "lunch": {},
        "dinner": {},
        "snacks": []
      }
    ]
  }
}
```

---

### 5.2. Nhận diện ảnh
**Endpoint:** `POST /api/ai/image-recognition`

**Request Body:**
```json
{
  "uid": "string",
  "imageData": "base64_string",
  "formatFile": "string"
}
```

**Response:**
```json
{
  "message": "Nhận diện ảnh thành công!",
  "results": {
    "ingredients": [
      {
        "name": "string",
        "confidence": "number"
      }
    ],
    "dishes": [
      {
        "name": "string",
        "confidence": "number"
      }
    ]
  }
}
```

---

### 5.3. Gợi ý món ăn
**Endpoint:** `POST /api/ai/suggested-dishes`

**Request Body:**
```json
{
  "uid": "string",
  "ingredients": ["string"],
  "preferences": {
    "cuisineType": "string",
    "cookingTime": "number",
    "difficulty": "string"
  }
}
```

**Response:**
```json
{
  "message": "Gợi ý món ăn thành công!",
  "suggestions": [
    {
      "recipeName": "string",
      "matchPercentage": "number",
      "missingIngredients": ["string"],
      "estimatedTime": "number"
    }
  ]
}
```

---

### 5.4. Phân tích dinh dưỡng
**Endpoint:** `POST /api/ai/nutrition-analysis`

**Request Body:**
```json
{
  "uid": "string",
  "recipeId": "string (optional)",
  "ingredients": [
    {
      "name": "string",
      "quantity": "number",
      "unit": "string"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Phân tích dinh dưỡng thành công!",
  "nutrition": {
    "calories": "number",
    "protein": "number",
    "carbs": "number",
    "fat": "number",
    "fiber": "number",
    "vitamins": {},
    "minerals": {}
  }
}
```

---

## 6. File APIs (`/api/file`)

### 6.1. Lấy file
**Endpoint:** `GET /api/file/:id/:filename`

**Parameters:**
- `id`: ID của thư mục
- `filename`: Tên file

**Response:**
- File được trả về trực tiếp

---

## 7. Overview APIs (`/api/overview`)

### 7.1. Lấy dữ liệu dashboard
**Endpoint:** `GET /api/overview/dashboard`

**Response:**
```json
{
  "stats": {
    "totalPosts": "number",
    "totalUsers": "number",
    "totalRecipes": "number",
    "activeUsers": "number"
  },
  "recentPosts": [],
  "popularRecipes": [],
  "trends": []
}
```

---

## Error Responses

Tất cả các API đều có thể trả về các lỗi sau:

### 400 Bad Request
```json
{
  "message": "Thông tin không hợp lệ!",
  "errors": {
    "field": "error message"
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Chưa xác thực!"
}
```

### 403 Forbidden
```json
{
  "message": "Không có quyền truy cập!"
}
```

### 404 Not Found
```json
{
  "message": "Không tìm thấy!"
}
```

### 500 Internal Server Error
```json
{
  "message": "Lỗi hệ thống!",
  "error": "error details"
}
```

---

## Authentication

Hầu hết các API (trừ login, signup, confirm) đều yêu cầu authentication token trong header:

```
Authorization: Bearer <token>
```

---

## Notes

- Tất cả các datetime đều theo format ISO 8601
- Các trường có `(optional)` có thể bỏ qua
- Rating luôn là số từ 1 đến 5
- Language hỗ trợ: `vi` (Tiếng Việt), `en` (English)
- Theme hỗ trợ: `light`, `dark`, `system`
