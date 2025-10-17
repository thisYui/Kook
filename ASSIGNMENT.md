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
- User: user_id, name, email, password_hash, avatar_url, language, theme, allergies (Json enum: Loại nguyên liệu dc lưu ở backend), bio, created_at, updated_at 
- JWT_Token: jwt_id, user_id (FK→User), token, exp, user_agent, ip_address, created_at, updated_at
- Follow: follow_id, follower_id (FK→User), followee_id (FK→User), created_at, updated_at
- Post: post_id, author_id (FK→User), recipe_id (FK→Recipe), title, rating_avg, rating_count, short_description, cuisine (Json enum: Loại ẩm thực dc lưu ở backend), country_code (iso2), image_url, created_at, updated_at
- Ingredient: ingredient_id, post_id (FK→Post), ingredient_key (Json enum: Loại nguyên liệu dc lưu ở backend), weight, created_at, updated_at
- Recipe: recipe_id, post_id (FK→Post), total_time, difficulty, total_steps, current_version, created_at, updated_at
- Rating: rating_id, post_id (FK→Post), user_id (FK→User), value, created_at, updated_at
- Comment: comment_id, post_id (FK→Post), user_id (FK→User), content, created_at, updated_at
- Badge: badge_id, title, description, created_at, updated_at (criteria (tiêu chí) (JSON) sẽ được lưu ở phía backend để kiểm tra vì nó là thuộc tính phi nguyên tố) 
- User_Badge: id, user_id (FK→User), badge_id (FK→Badge), created_at, updated_at
- Repost: repost_id, original_post_id (FK→Post), sharer_id (FK→User), description, created_at, updated_at
- Notebook: notebook_id, user_id (FK→User), post_id (FK→Post), created_at, updated_at (Chỉ xem lại ko phải đăng lại)
- Notification: notification_id, user_id (FK→User), is_read, created_at, updated_at
- Note:
note_id (UUID),
user_id (FK→User),
post_id (FK→Post),
step_order (int),                 -- bước trong RecipeDetail.steps
content (text),
color (int),
start_index (int),
end_index (int),
anchor_text (text),               -- đoạn gốc được highlight
recipe_version (int),             -- version khi tạo note
is_broken (bool DEFAULT false),   -- nếu không thể map khi recipe thay đổi
created_at, updated_at

## NoSQL – MongoDB
Collection: RecipeDetail

Chứa toàn bộ nội dung chi tiết của công thức.
Mỗi document tương ứng với 1 recipe/post trong SQL.

Cấu trúc ví dụ:

{
  "recipe_id": "uuid_123",
  "post_id": "uuid_456",
  "ingredients": [
    {
      "group": "Phần bánh",
      "items": [
        {"name": "Bột mì", "quantity": "200g", "note": "rây mịn"},
        {"name": "Trứng", "quantity": "2 quả"}
      ]
    },
    {
      "group": "Phần kem",
      "items": [
        {"name": "Kem whipping", "quantity": "150ml"},
        {"name": "Đường", "quantity": "50g"}
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
      "has_timer": false
    },
    {
      "order": 2,
      "title": "Nấu nước dùng",
      "description": "Đun sôi 1.5L nước trong 10 phút.",
      "media": [],
      "duration": 10,
      "has_timer": true
    }
  ],
  "tips": [
    "Không đun quá lâu để giữ vị ngọt tự nhiên.",
    "Có thể thay thịt gà bằng thịt bò nếu muốn."
  ],
  "notes": [
    {"user_id": "u1", "content": "Tôi giảm muối còn 1/2 thì hợp khẩu vị hơn."}
  ],
  "version": 3,
  "last_updated": "2025-10-16T21:00:00Z"
}

ingredients: linh hoạt, có thể chia nhóm.
steps: chứa mô tả, media (ảnh/video), thời lượng.
notes: cho phép user đính kèm nhận xét riêng.
version: để quản lý nếu user sửa công thức (giúp versioning).
