# Description
Ứng dụng web chia sẻ công thức nấu ăn thông minh, cho phép người dùng tạo tài khoản (tên, email, mật khẩu) và tùy chỉnh hồ sơ, bao gồm khai báo danh sách dị ứng thực phẩm (ví dụ: hải sản, trứng, sữa, gluten, hoặc chỉ định cụ thể như tôm, cua, mực...).
Hệ thống sẽ tự động cảnh báo khi người dùng xem hoặc tìm kiếm công thức có chứa nguyên liệu dị ứng, và có tùy chọn loại trừ hoàn toàn các công thức đó khỏi gợi ý.

Người dùng có thể đăng công thức nấu ăn chuyên biệt (recipe post) với các trường bắt buộc như: tiêu đề, mô tả ngắn, danh sách nguyên liệu (tên, lượng, đơn vị), bước thực hiện chi tiết (step-by-step có hình ảnh, video, thời gian, timer), độ khó, chủ đề ẩm thực/quốc gia, thời gian chuẩn bị, thời gian nấu, ảnh bìa, nguồn và tag.
Bài viết có thể được xem trước (preview), kéo thả để sắp xếp bước, và chuyển đổi đơn vị đo lường tự động.
Mỗi bài có thể được xuất ra PDF đẹp hoặc tạo QR code để chia sẻ.

Người dùng khác có thể đánh giá (rating), bình luận có thread, upvote/downvote, và báo cáo bình luận. Khi người dùng hoàn thành chế độ nấu step-by-step, hệ thống sẽ lưu tiến độ và tăng số lượng người hoàn thành món, đồng thời có thể gửi thông báo cho followers.

Ứng dụng hỗ trợ repost công thức (chia sẻ bài người khác kèm ghi chú) hoặc fork để chỉnh sửa lại, giữ credit cho tác giả gốc.
Người dùng có thể ghi chú (annotate) trực tiếp lên từng bước công thức — ghi chú này có thể riêng tư hoặc chia sẻ công khai.

Người dùng có thể tham gia thử thách (challenge) như “đoán món từ ảnh/mô tả”, nơi cộng đồng cùng gợi ý và bình chọn công thức phù hợp; người đoán đúng hoặc được chọn sẽ nhận huy hiệu (achievement).
Huy hiệu còn được cấp tự động khi đạt mốc như: đăng bài đầu tiên, đạt 100 lượt thích, hoàn thành 10 món,...

Ứng dụng hỗ trợ chế độ “Cooking Mode” step-by-step với đồng bộ timer, hiển thị từng bước nấu, đếm ngược, và tự động lưu tiến trình để người dùng quay lại bất kỳ lúc nào.

Ngoài ra, người dùng có thể:

Sử dụng bộ lọc tìm kiếm nâng cao (lọc theo nguyên liệu, chế độ ăn, độ khó, thời gian, quốc gia, rating,...).

Nhận phân tích dinh dưỡng (calo, protein, fat, carbs, vi chất) được tính tự động từ nguyên liệu.

Sử dụng AI để gợi ý món từ nguyên liệu sẵn có trong tủ lạnh, hoặc tạo thực đơn ăn hàng tuần theo sở thích, khẩu phần và ngân sách.

Xem báo cáo xu hướng và dashboard analytics (món được nấu nhiều, tags phổ biến, xu hướng quốc gia ẩm thực).

Quản lý sổ tay cá nhân (notebook) để lưu recipe, ghi chú riêng, và tự động tạo danh sách mua sắm tổng hợp từ các công thức đã lưu.

Nhận diện món ăn từ ảnh (AI dish recognition) để gợi ý công thức tương ứng và cho phép cộng đồng hiệu chỉnh.

Ứng dụng hỗ trợ đa ngôn ngữ (multi-language UI và bản dịch công thức), thay đổi theme (dark/light), và thông báo real-time cho các hoạt động của người theo dõi.
Mọi dữ liệu được đồng bộ để đảm bảo trải nghiệm nhất quán trên mọi thiết bị.

# Schema
## SQL - PostgreSQL
### User
- `user_id` (PK, uuid)
- `name` (varchar)
- `email` (varchar, unique)
- `password_hash` (varchar)
- `avatar_url` (text)
- `language` (varchar)
- `theme` (varchar)
- `bio` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Ingredient_Catalog
- `ingredient_key` (PK, text)
- `display_name` (varchar)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### User_Allergy
- `id` (PK, uuid)
- `user_id` (FK → User)
- `ingredient_key` (FK → Ingredient_Catalog)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- **Unique**: (user_id, ingredient_key)

### JWT_Token
- `jwt_id` (PK, uuid)
- `user_id` (FK → User)
- `token` (text)
- `exp` (timestamp)
- `user_agent` (text)
- `ip_address` (varchar)
- `revoked` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Follow
- `follow_id` (PK, uuid)
- `follower_id` (FK → User)
- `followee_id` (FK → User)
- `created_at` (timestamp)
- **Unique**: (follower_id, followee_id)

### Post
- `post_id` (PK, uuid)
- `author_id` (FK → User)
- `title` (varchar)
- `short_description` (text)
- `rating_avg` (decimal)
- `rating_count` (integer)
- `cuisine` (jsonb enum)
- `country_code` (varchar, iso2)
- `image_url` (text)
- `view_count` (integer)
- `is_deleted` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Recipe
- `recipe_id` (PK, uuid)
- `post_id` (FK → Post)
- `total_time` (integer)
- `difficulty` (varchar)
- `total_steps` (integer)
- `current_version` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Recipe_Version_Map
- `id` (PK, uuid)
- `recipe_id` (FK → Recipe)
- `mongo_version` (integer)
- `created_at` (timestamp)
- `synced_at` (timestamp)

### Ingredient
- `ingredient_id` (PK, uuid)
- `post_id` (FK → Post)
- `ingredient_key` (FK → Ingredient_Catalog)
- `quantity` (numeric), 
- `unit` (varchar),
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Rating
- `rating_id` (PK, uuid)
- `post_id` (FK → Post)
- `user_id` (FK → User)
- `value` (integer, check: 1–5)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Comment
- `comment_id` (PK, uuid)
- `post_id` (FK → Post)
- `user_id` (FK → User)
- `content` (text)
- `is_deleted` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Badge
- `badge_id` (PK, uuid)
- `title` (varchar)
- `description` (text)
- `criteria` (jsonb)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### User_Badge
- `id` (PK, uuid)
- `user_id` (FK → User)
- `badge_id` (FK → Badge)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- **Unique**: (user_id, badge_id)

### Repost
- `repost_id` (PK, uuid)
- `original_post_id` (FK → Post)
- `sharer_id` (FK → User)
- `description` (text)
- `is_deleted` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Notebook
- `notebook_id` (PK, uuid)
- `user_id` (FK → User)
- `post_id` (FK → Post)
- `is_deleted` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Tag
- `tag_id` (PK, uuid)
- `name` (varchar, unique)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Post_Tag
- `id` (PK, uuid)
- `post_id` (FK → Post)
- `tag_id` (FK → Tag)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- **Unique**: (post_id, tag_id)

### MealPlan_Meta
- `plan_id` (PK, uuid)
- `user_id` (FK → User)
- `goal` (text)
- `week_start` (date)
- `version` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Notification
- `notification_id` (PK, uuid)
- `user_id` (FK → User)
- `type` (enum: follow, comment, rating, badge, repost, system)
- `is_read` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Note
- `note_id` (PK, uuid)
- `user_id` (FK → User)
- `post_id` (FK → Post)
- `step_order` (integer)
- `content` (text)
- `color` (integer)
- `start_index` (integer)
- `end_index` (integer)
- `version` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## NoSQL – MongoDB
Collection: RecipeDetail

Chứa toàn bộ nội dung chi tiết của công thức.
Mỗi document tương ứng với 1 recipe/post trong SQL.

Cấu trúc ví dụ:

{
  "recipe_id": "uuid_recipe",
  "post_id": "uuid_post",
  "ingredients": [
    {
      "group": "Phần bánh",
      "items": [
        {"name": "Bột mì", "quantity": "200g", "note": "rây mịn"},
        {"name": "Trứng", "quantity": "2 quả"}
      ]
    },
    {
      "group": "Phần nhân",
      "items": [
        {"name": "Thịt băm", "quantity": "300g"},
        {"name": "Hành tím", "quantity": "1 củ", "note": "băm nhỏ"}
      ]
    }
  ],
  "steps": [
    {
      "order": 1,
      "title": "Chuẩn bị nguyên liệu",
      "description": "Rửa sạch rau, cắt nhỏ.",
      "media": [
        {"type": "image", "url": "https://cdn/step1.jpg"},
        {"type": "video", "url": "https://cdn/step1.mp4"}
      ],
      "duration": 3,
      "has_timer": false,
      tips": [
        "Sử dụng rau tươi để món ăn ngon hơn.",
        "Có thể ngâm rau trong nước muối loãng 10 phút."
      ]
  ],
  "version": 3,
  "created_at": "2025-10-15T10:00:00Z",
  "updated_at": "2025-10-16T12:00:00Z"
}

ingredients: linh hoạt, có thể chia nhóm.
steps: chứa mô tả, media (ảnh/video), thời lượng.
notes: cho phép user đính kèm nhận xét riêng.
version: để quản lý nếu user sửa công thức (giúp versioning).

Collection: MealPlan

Cấu trúc ví dụ
{
  "plan_id": "uuid_plan",
  "user_id": "uuid_user",
  "week_start": "2025-10-20",
  "meals": {
    "Monday": [
      {"meal_type": "Breakfast", "recipe_id": "uuid_r1"},
      {"meal_type": "Lunch", "recipe_id": "uuid_r2"},
      {"meal_type": "Dinner", "recipe_id": "uuid_r3"}
    ],
    "Tuesday": [
      {"meal_type": "Breakfast", "recipe_id": "uuid_r4"},
      {"meal_type": "Lunch", "recipe_id": "uuid_r5"},
      {"meal_type": "Dinner", "recipe_id": "uuid_r6"}
    ]
  },
  "version": 1,
  "created_at": "2025-10-15T10:00:00Z",
  "updated_at": "2025-10-16T12:00:00Z"
}
