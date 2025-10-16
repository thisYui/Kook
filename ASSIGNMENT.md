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

5. nhóm cộng đồng (community groups) + rating cộng đồng

mô tả: tạo nhóm theo chủ đề (ví dụ: làm bánh, ăn chay), có trang nhóm, quản trị nhóm, bài pinned, sự kiện. thành viên có thể đánh giá chất lượng nhóm.
ui: page nhóm với mô tả, rules, list bài, events, leaderboard thành viên. nút join/leave. role: owner, admin, moderator, member.
dữ liệu: group_id, members, roles, rating_score, rules.
hành vi: admins có quyền approve bài viết (nếu nhóm private), gắn huy hiệu cho thành viên, report nội dung. rating cộng đồng cập nhật theo feedback member.
acceptance: nhóm có quản trị, user join/leave, rating nhóm hiển thị và có thể submit.

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

22. cấp độ chef (level)

mô tả: hệ thống level dựa trên đóng góp: số bài, lượt like, số completions, đóng góp cho community (translation, moderation). level mở khóa quyền (tạo nhóm, mod).
ui: progress bar trên profile, perks list per-level.
acceptance: level tự động cập nhật theo điểm đóng góp; quyền tương ứng mở.

23. note trực tiếp trên recipe (annotate)

mô tả: cho phép user ghi note cá nhân trên từng recipe (private hoặc shareable), highlight đoạn step rồi gắn note (timestamped). notes có thể là text/photo.
ui: inline note icon ở mỗi step; quản lý notes trong sidebar notebook. share note public nếu user muốn.
acceptance: user thêm note tại step, note hiển thị khi mở recipe; private notes không hiển thị cho người khác trừ khi share.