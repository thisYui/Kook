# Feature List
### 1. Chia sẻ công thức nấu ăn (post chuyên biệt)

- **Mô tả**: Mỗi bài viết có một cấu trúc riêng (có các trường bắt buộc và tuỳ chọn) thay vì chỉ một bài viết free text.

- **Trường dữ liệu**: tiêu đề, mô tả ngắn, list nguyên liệu (tên, lượng, đơn vị), các thành phần đặc biệt (đường, muối, dầu...), số người ăn, bước thực hiện (step: tiêu đề, mô tả, hình/ video, thời gian bước, timer flag), thời gian chuẩn bị, thời gian nấu, độ khó, ẩm thực/quốc gia, tags, ảnh bìa, nguồn/credit, isPrivate/isDraft, trang phục dụng cụ.

- **UI**: form tạo bài có phần nhập nguyên liệu theo hàng (autocomplete nguyên liệu + gợi ý đơn vị), drag & drop để sắp xếp bước, preview recipe, nút “thêm timer” ở từng step.

- **Hành vi**: validate lượng/nguyên liệu, chuyển đổi đơn vị cơ bản, auto-suggest nguyên liệu phổ biến.

- **Acceptance**: người dùng tạo được post chứa đầy đủ trường bắt buộc; preview hiển thị đúng; nguyên liệu có thể thay đổi lượng/đơn vị.

### 2. Rating và bình luận

- **Mô tả**: cho phép đánh giá điểm (1–5 sao) và bình luận có threading (trả lời bình luận).

- **UI**: hiển thị trung bình sao, tổng lượt đánh giá, phần bình luận theo thời gian hoặc theo hữu ích. upvote/downvote comment, khả năng report.

- **Dữ liệu**: user_id, recipe_id, rating_value, comment_text, parent_comment_id, likes.

- **Hành vi**: mỗi user chỉ được rate 1 lần (có thể cập nhật), cập nhật điểm trung bình realtime. notification cho tác giả khi có comment mới.

- **Acceptance**: rating cập nhật trung bình; comment threaded hiển thị; user không thể vote nhiều lần.

### 3. Chia sẻ / đăng lại (repost)

- **Mô tả**: user có thể chia sẻ bài người khác lên timeline của mình (có thể kèm note), hoặc làm bản sao để chỉnh sửa lại (fork).

- **UI**: nút "chia sẻ" với modal chọn: chia sẻ công khai / gửi vào nhóm / lưu bản nháp để chỉnh sửa. có option ghi nguồn.

- **Dữ liệu**: original_recipe_id, sharer_id, note, visibility.

- **Hành vi**: khi repost, giữ liên kết đến bản gốc và hiển thị credit; tăng lượt chia sẻ trên bản gốc.

- **Acceptance**: repost tạo entry mới liên kết về gốc; credit hiển thị.

### 4. Bộ lọc tìm kiếm nâng cao

- **Mô tả**: bộ lọc nhiều chiều: nguyên liệu (include/exclude), thời gian nấu, độ khó, chế độ ăn (vegan, vegetarian, keto...), mức muối/đường (nếu tag), ẩm thực/quốc gia, rating, nguyên liệu trong tủ lạnh.

- **UI**: sidebar filter + chips cho filter active; search by ingredients with fuzzy match; toggle “loại trừ dị ứng”.

- **Dữ liệu**: support tags, ingredient index, normalized prep_time, difficulty enum.

- **Acceptance**: người dùng có thể tìm ra công thức theo ít nhất 3 tiêu chí kết hợp; filter exclude hoạt động.

### 5. Note trực tiếp trên recipe (annotate)

- **Mô tả**: cho phép user ghi note cá nhân trên từng recipe (private hoặc shareable), highlight đoạn step rồi gắn note (timestamped). notes có thể là text/photo.

- **UI**: inline note icon ở mỗi step; quản lý notes trong sidebar notebook. share note public nếu user muốn.

- **Acceptance**: user thêm note tại step, note hiển thị khi mở recipe; private notes không hiển thị cho người khác trừ khi share.

### 6. Giao diện step-by-step có đồng bộ timer

- **Mô tả**: khi người dùng thực thi công thức, có chế độ “bắt đầu nấu” hiển thị từng step, chuyển tab khi hoàn thành step; nếu step có timer (ví dụ 10 phút), sẽ đếm ngược.

- **UI**: màn hình cooking mode full-screen/compact; progress bar step; nút “đã xong” để sang step tiếp theo; optional voice/read-aloud. auto-pause khi máy khóa (mobile).

- **Dữ liệu**: user_progress (recipe_id, current_step, timestamps), timer_state.

- **Hành vi**: nếu người rời đi rồi quay lại, tiếp tục từ step cuối; event “complete recipe” khi hoàn tất. notification cho followers khi hoàn thành (tuỳ chọn).

- **Acceptance**: user có thể chạy chế độ step-by-step, timer chạy chính xác, progress lưu lại khi reload.

### 7. Phân tích và nắm bắt xu hướng người dùng

- **Mô tả**: dashboard admin/creator cho thấy xu hướng: topic hot, tăng trưởng lượt tìm kiếm, tags đang lên, quốc gia ẩm thực phổ biến.

- **Metrics**: số view, save, share, hoàn thành, rating trung bình theo topic, growth rate theo tuần/tháng.

- **UI**: biểu đồ time-series, top-n lists, heatmap theo khu vực (nếu có location).

- **Acceptance**: dashboard hiển thị top 10 món/tag theo ngày/tuần/tháng; admin có filter thời gian.

### 8. Phân tích dinh dưỡng + tính calo

- **Mô tả**: tự động tính calo, macro (protein/carbs/fat), và micronutrients (nếu có dữ liệu) dựa trên danh sách nguyên liệu và lượng nhập. hỗ trợ scale theo số phần ăn.

- **Dữ liệu**: mapping nguyên liệu → nutrition per unit (cần database dinh dưỡng). recipe_nutrition = sum(ingredient * quantity).

- **UI**: bảng dinh dưỡng trong recipe (per portion & per recipe), cảnh báo khi vượt ngưỡng (calo/certain nutrient). export báo cáo dinh dưỡng.

- **Acceptance**: người dùng nhập nguyên liệu + lượng → hệ thống trả về calories và macros; hỗ trợ scale số phần.

### 9. AI: gợi ý món ăn từ nguyên liệu có sẵn (tủ lạnh)

- **Mô tả**: user nhập/scan list nguyên liệu (text hoặc camera/ OCR), hệ thống gợi ý các công thức phù hợp, kèm mức phù hợp (exact/near).

- **UI**: input ingredients (checkbox + autocomplete), suggestion list sắp theo tỉ lệ phù hợp, highlight những nguyên liệu còn thiếu và đề xuất thay thế.

- **Hành vi**: hỗ trợ exclude dị ứng, prefer chế độ ăn.

- **Acceptance**: với list tủ lạnh, ít nhất 5 gợi ý phù hợp hiện ra; hiển thị nguyên liệu thiếu.

### 10. AI: tạo thực đơn hàng tuần

- **Mô tả**: sinh weekly meal plan theo sở thích, chế độ ăn, ngân sách, thời gian chuẩn bị. có tùy chọn scale cho số người và export shopping list.

- **UI**: wizard chọn preferences → generate → chỉnh sửa từng ngày → export pdf/print/qr.

- **Acceptance**: tạo được lịch 7 ngày kèm link đến recipe + shopping list.

### 11. Thông báo cho follower

- **Mô tả**: push/ email/ in-app notification khi người theo dõi đăng bài mới, hoặc khi có update (bản sửa, comment). tuỳ chọn tắt bật.

- **UI**: settings notification per-type; bell icon with unread count.

- **Acceptance**: follower nhận in-app notification khi author họ follow đăng bài mới (nếu bật).

### 12. Huy hiệu & achievements

- **Mô tả**: hệ thống badge tự động cấp khi hoàn thành nhiệm vụ (đăng bài đầu tiên, nhận 100 likes, tham gia 5 nhóm...). badges hiển thị trên profile.

- **UI**: trang achievements, progress bars cho từng badge, pop-up khi unlock.

- **Dữ liệu**: badge_id, criteria, user_badges.

- **Acceptance**: sau khi user đạt điều kiện, badge được cấp và hiển thị.

### 13. Đa ngôn ngữ

- **Mô tả**: ui & content hỗ trợ nhiều ngôn ngữ; cho phép translation community-driven cho recipe (original + translated copies).

- **UI**: language switcher, flag/locale indicator, button “dịch” cho recipe.

- **Dữ liệu**: recipe_translations table, locale tag.

- **Acceptance**: ui chuyển đổi language; recipe có thể có nhiều bản dịch.

### 14. Thay đổi theme

- **Mô tả**: hỗ trợ dark/light và một số theme màu, tùy chọn trên profile hoặc system preference.

- **UI**: theme switcher trong settings; preview nhỏ. lưu preference per-user.

- **Acceptance**: theme thay đổi ngay và persist trên thiết bị.

### 15. Tạo qr code cho recipe

- **Mô tả**: generate qr (link ngắn) cho từng recipe để in hoặc dán. qr mở trực tiếp trang recipe.

- **UI**: nút generate QR, preview, download png/svg, size options.

- **Acceptance**: qr scan mở đúng url recipe; có tùy chọn include ingredient summary.

### 16. Xuất pdf cho recipe

- **Mô tả**: export recipe thành pdf đẹp (ảnh, ingredient list, step-by-step, nutrition), chọn layout (1 column/2 column).

- **UI**: nút export pdf với options: include notes, include nutrition, scale servings.

- **Acceptance**: pdf download thành công và format readable, images included.

### 17. Challenge: tìm món từ ảnh / mô tả (community challenge)

- **Mô tả**: chế độ post riêng: user đăng ảnh + mô tả, cộng đồng đoán món và gợi ý recipe. có voting cho gợi ý hay nhất.

- **UI**: gallery challenge, timeline dự đoán, leaderboard contributors.

- **Hành vi**: reward badge cho người đoán đúng/được chọn. moderation cho content.

- **Acceptance**: người dùng tạo challenge; community đăng gợi ý và vote.

### 18. Sổ tay cá nhân (notebook)

- **Mô tả**: user có thể lưu recipe vào sổ tay, thêm note cá nhân, tạo danh sách mua sắm dựa trên những recipe đã lưu (merge nguyên liệu, aggregate quantities).

- **UI**: personal cookbook, notebook entries with private notes, shopping list generator with checkboxes. shareable notebook optional.

- **Acceptance**: user lưu recipe + thêm note; shopping list tổng hợp được export/print.

### 19. Quản lý dị ứng & cảnh báo

- **Mô tả**: user khai báo dị ứng (list nguyên liệu). hệ thống loại trừ recipe chứa nguyên liệu dị ứng khỏi gợi ý; khi view recipe có nguyên liệu nghi ngờ, highlight đỏ + hiển thị warning modal.

- **UI**: settings dị ứng, indicator đỏ trên recipe, confirmation dialogue khi user muốn view anyway.

- **Acceptance**: recipe chứa ingredient dị ứng được đánh dấu rõ ràng; search có option exclude allergens.

### 20. Ghi nhận số lượng người hoàn thành món

- **Mô tả**: khi user finish chế độ step-by-step, hệ thống +1 count “completions” cho recipe; có thể chia theo region/time.

- **UI**: hiển thị số completed trên recipe; leaderboard recipe “most-cooked”.

- **Acceptance**: completion được ghi nhận chính xác khi user hoàn tất.

### 21. AI: nhận diện món ăn từ hình ảnh

- **Mô tả**: upload ảnh → model trả về tên món + confidence + list công thức tương tự + gợi ý nguyên liệu. kèm nút “this is not the dish” để community sửa.

- **UI**: result card với tên, confidence, liên kết recipes, option report/feedback.

- **Acceptance**: lên ít nhất 3 gợi ý recipe phù hợp; có feedback loop để improve model.
