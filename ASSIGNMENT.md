# Feature
1. chia sẻ công thức nấu ăn (post chuyên biệt)

mô tả: post có cấu trúc chuyên biệt cho công thức (trường bắt buộc và tuỳ chọn) thay vì chỉ một bài viết free text.
trường dữ liệu: tiêu đề, mô tả ngắn, list nguyên liệu (tên, lượng, đơn vị), các thành phần đặc biệt (đường, muối, dầu...), số người ăn, bước thực hiện (step: tiêu đề, mô tả, hình/ video, thời gian bước, timer flag), thời gian chuẩn bị, thời gian nấu, độ khó, ẩm thực/quốc gia, tags, ảnh bìa, nguồn/credit, isPrivate/isDraft, trang phục dụng cụ.
ui: form tạo bài có phần nhập nguyên liệu theo hàng (autocomplete nguyên liệu + gợi ý đơn vị), drag & drop để sắp xếp bước, preview recipe, nút “thêm timer” ở từng step.
hành vi: validate lượng/nguyên liệu, chuyển đổi đơn vị cơ bản, auto-suggest nguyên liệu phổ biến.
acceptance: người dùng tạo được post chứa đầy đủ trường bắt buộc; preview hiển thị đúng; nguyên liệu có thể thay đổi lượng/đơn vị.

2. rating và bình luận

mô tả: cho phép đánh giá điểm (1–5 sao) và bình luận có threading (trả lời bình luận).
ui: hiển thị trung bình sao, tổng lượt đánh giá, phần bình luận theo thời gian hoặc theo hữu ích. upvote/downvote comment, khả năng report.
dữ liệu: user_id, recipe_id, rating_value, comment_text, parent_comment_id, likes.
hành vi: mỗi user chỉ được rate 1 lần (có thể cập nhật), cập nhật điểm trung bình realtime. notification cho tác giả khi có comment mới.
acceptance: rating cập nhật trung bình; comment threaded hiển thị; user không thể vote nhiều lần.

3. chia sẻ lại / đăng lại (repost)

mô tả: user có thể chia sẻ bài người khác lên timeline của mình (có thể kèm note), hoặc làm bản sao để chỉnh sửa lại (fork).
ui: nút "chia sẻ" với modal chọn: chia sẻ công khai / gửi vào nhóm / lưu bản nháp để chỉnh sửa. có option ghi nguồn.
dữ liệu: original_recipe_id, sharer_id, note, visibility.
hành vi: khi repost, giữ liên kết đến bản gốc và hiển thị credit; tăng lượt chia sẻ trên bản gốc.
acceptance: repost tạo entry mới liên kết về gốc; credit hiển thị.

4. bộ lọc tìm kiếm nâng cao

mô tả: bộ lọc nhiều chiều: nguyên liệu (include/exclude), thời gian nấu, độ khó, chế độ ăn (vegan, vegetarian, keto...), mức muối/đường (nếu tag), ẩm thực/quốc gia, rating, nguyên liệu trong tủ lạnh.
ui: sidebar filter + chips cho filter active; search by ingredients with fuzzy match; toggle “loại trừ dị ứng”.
dữ liệu: support tags, ingredient index, normalized prep_time, difficulty enum.
acceptance: người dùng có thể tìm ra công thức theo ít nhất 3 tiêu chí kết hợp; filter exclude hoạt động.

5. note trực tiếp trên recipe (annotate)

mô tả: cho phép user ghi note cá nhân trên từng recipe (private hoặc shareable), highlight đoạn step rồi gắn note (timestamped). notes có thể là text/photo.
ui: inline note icon ở mỗi step; quản lý notes trong sidebar notebook. share note public nếu user muốn.
acceptance: user thêm note tại step, note hiển thị khi mở recipe; private notes không hiển thị cho người khác trừ khi share.

6. giao diện step-by-step có đồng bộ timer

mô tả: khi người dùng thực thi công thức, có chế độ “bắt đầu nấu” hiển thị từng step, chuyển tab khi hoàn thành step; nếu step có timer (ví dụ 10 phút), sẽ đếm ngược.
ui: màn hình cooking mode full-screen/compact; progress bar step; nút “đã xong” để sang step tiếp theo; optional voice/read-aloud. auto-pause khi máy khóa (mobile).
dữ liệu: user_progress (recipe_id, current_step, timestamps), timer_state.
hành vi: nếu người rời đi rồi quay lại, tiếp tục từ step cuối; event “complete recipe” khi hoàn tất. notification cho followers khi hoàn thành (tuỳ chọn).
acceptance: user có thể chạy chế độ step-by-step, timer chạy chính xác, progress lưu lại khi reload.

7. analytics xu hướng người dùng

mô tả: dashboard admin/creator cho thấy xu hướng: topic hot, tăng trưởng lượt tìm kiếm, tags đang lên, quốc gia ẩm thực phổ biến.
metrics: số view, save, share, hoàn thành, rating trung bình theo topic, growth rate theo tuần/tháng.
ui: biểu đồ time-series, top-n lists, heatmap theo khu vực (nếu có location).
acceptance: dashboard hiển thị top 10 món/tag theo ngày/tuần/tháng; admin có filter thời gian.

8. analytics dinh dưỡng + tính calo

mô tả: tự động tính calo, macro (protein/carbs/fat), và micronutrients (nếu có dữ liệu) dựa trên danh sách nguyên liệu và lượng nhập. hỗ trợ scale theo số phần ăn.
dữ liệu: mapping nguyên liệu → nutrition per unit (cần database dinh dưỡng). recipe_nutrition = sum(ingredient * quantity).
ui: bảng dinh dưỡng trong recipe (per portion & per recipe), cảnh báo khi vượt ngưỡng (calo/certain nutrient). export báo cáo dinh dưỡng.
acceptance: người dùng nhập nguyên liệu + lượng → hệ thống trả về calories và macros; hỗ trợ scale số phần.

9. ai: gợi ý món ăn từ nguyên liệu có sẵn (tủ lạnh)

mô tả: user nhập/scan list nguyên liệu (text hoặc camera/ OCR), hệ thống gợi ý các công thức phù hợp, kèm mức phù hợp (exact/near).
ui: input ingredients (checkbox + autocomplete), suggestion list sắp theo tỉ lệ phù hợp, highlight những nguyên liệu còn thiếu và đề xuất thay thế.
hành vi: hỗ trợ exclude dị ứng, prefer chế độ ăn.
acceptance: với list tủ lạnh, ít nhất 5 gợi ý phù hợp hiện ra; hiển thị nguyên liệu thiếu.

10. ai: tạo thực đơn hàng tuần

mô tả: sinh weekly meal plan theo sở thích, chế độ ăn, ngân sách, thời gian chuẩn bị. có tùy chọn scale cho số người và export shopping list.
ui: wizard chọn preferences → generate → chỉnh sửa từng ngày → export pdf/print/qr.
acceptance: tạo được lịch 7 ngày kèm link đến recipe + shopping list.

11. thông báo cho follower

mô tả: push/ email/ in-app notification khi người theo dõi đăng bài mới, hoặc khi có update (bản sửa, comment). tuỳ chọn tắt bật.
ui: settings notification per-type; bell icon with unread count.
acceptance: follower nhận in-app notification khi author họ follow đăng bài mới (nếu bật).

12. huy hiệu & achievements

mô tả: hệ thống badge tự động cấp khi hoàn thành nhiệm vụ (đăng bài đầu tiên, nhận 100 likes, tham gia 5 nhóm...). badges hiển thị trên profile.
ui: trang achievements, progress bars cho từng badge, pop-up khi unlock.
dữ liệu: badge_id, criteria, user_badges.
acceptance: sau khi user đạt điều kiện, badge được cấp và hiển thị.

13. đa ngôn ngữ

mô tả: ui & content hỗ trợ nhiều ngôn ngữ; cho phép translation community-driven cho recipe (original + translated copies).
ui: language switcher, flag/locale indicator, button “dịch” cho recipe.
dữ liệu: recipe_translations table, locale tag.
acceptance: ui chuyển đổi language; recipe có thể có nhiều bản dịch.

14. thay đổi theme

mô tả: hỗ trợ dark/light và một số theme màu, tùy chọn trên profile hoặc system preference.
ui: theme switcher trong settings; preview nhỏ. lưu preference per-user.
acceptance: theme thay đổi ngay và persist trên thiết bị.

15. tạo qr code cho recipe

mô tả: generate qr (link ngắn) cho từng recipe để in hoặc dán. qr mở trực tiếp trang recipe.
ui: nút generate QR, preview, download png/svg, size options.
acceptance: qr scan mở đúng url recipe; có tùy chọn include ingredient summary.

16. xuất pdf cho recipe

mô tả: export recipe thành pdf đẹp (ảnh, ingredient list, step-by-step, nutrition), chọn layout (1 column/2 column).
ui: nút export pdf với options: include notes, include nutrition, scale servings.
acceptance: pdf download thành công và format readable, images included.

17. challenge: tìm món từ ảnh / mô tả (community challenge)

mô tả: chế độ post riêng: user đăng ảnh + mô tả, cộng đồng đoán món và gợi ý recipe. có voting cho gợi ý hay nhất.
ui: gallery challenge, timeline dự đoán, leaderboard contributors.
hành vi: reward badge cho người đoán đúng/được chọn. moderation cho content.
acceptance: người dùng tạo challenge; community đăng gợi ý và vote.

18. sổ tay cá nhân (notebook)

mô tả: user có thể lưu recipe vào sổ tay, thêm note cá nhân, tạo danh sách mua sắm dựa trên những recipe đã lưu (merge nguyên liệu, aggregate quantities).
ui: personal cookbook, notebook entries with private notes, shopping list generator with checkboxes. shareable notebook optional.
acceptance: user lưu recipe + thêm note; shopping list tổng hợp được export/print.

19. quản lý dị ứng & cảnh báo

mô tả: user khai báo dị ứng (list nguyên liệu). hệ thống loại trừ recipe chứa nguyên liệu dị ứng khỏi gợi ý; khi view recipe có nguyên liệu nghi ngờ, highlight đỏ + hiển thị warning modal.
ui: settings dị ứng, indicator đỏ trên recipe, confirmation dialogue khi user muốn view anyway.
acceptance: recipe chứa ingredient dị ứng được đánh dấu rõ ràng; search có option exclude allergens.

20. ghi nhận số lượng người hoàn thành món

mô tả: khi user finish chế độ step-by-step, hệ thống +1 count “completions” cho recipe; có thể chia theo region/time.
ui: hiển thị số completed trên recipe; leaderboard recipe “most-cooked”.
acceptance: completion được ghi nhận chính xác khi user hoàn tất.

21. ai: nhận diện món ăn từ hình ảnh

mô tả: upload ảnh → model trả về tên món + confidence + list công thức tương tự + gợi ý nguyên liệu. kèm nút “this is not the dish” để community sửa.
ui: result card với tên, confidence, liên kết recipes, option report/feedback.
acceptance: lên ít nhất 3 gợi ý recipe phù hợp; có feedback loop để improve model.

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
