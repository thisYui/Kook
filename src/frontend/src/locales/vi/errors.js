/**
 * Error Code Translations - Vietnamese
 */

export const errorMessages = {
    // Authentication Errors (1000-1099)
    AUTH_1001: "Email hoặc mật khẩu không đúng",
    AUTH_1002: "Không tìm thấy email",
    AUTH_1003: "Tài khoản đã bị vô hiệu hóa",
    AUTH_1004: "Tài khoản chưa được xác thực. Vui lòng kiểm tra email",
    AUTH_1005: "Token xác thực không hợp lệ",
    AUTH_1006: "Token xác thực đã hết hạn",
    AUTH_1007: "Refresh token không hợp lệ",
    AUTH_1008: "Refresh token đã hết hạn",
    AUTH_1009: "Email đã tồn tại",
    AUTH_1010: "Mật khẩu quá yếu. Phải có ít nhất 8 ký tự",
    AUTH_1011: "Mật khẩu không khớp",
    AUTH_1012: "Mã OTP không đúng",
    AUTH_1013: "Mã OTP đã hết hạn",
    AUTH_1014: "Mã OTP đã được sử dụng",
    AUTH_1015: "Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau",
    AUTH_1016: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại",
    AUTH_1017: "Truy cập không được phép",
    AUTH_1018: "Mật khẩu hiện tại không đúng",
    AUTH_1019: "Yêu cầu gửi lại OTP quá sớm. Vui lòng chờ trước khi yêu cầu mã mới",
    AUTH_1020: "Đã vượt quá số lần thử mã OTP. Vui lòng yêu cầu mã mới",

    // User Errors (1100-1199)
    USER_1101: "Không tìm thấy người dùng",
    USER_1102: "Hồ sơ chưa hoàn thiện",
    USER_1103: "Đã theo dõi người dùng này",
    USER_1104: "Chưa theo dõi người dùng này",
    USER_1105: "Không thể tự theo dõi mình",
    USER_1106: "Thông tin dị ứng không hợp lệ",

    // Post Errors (1200-1299)
    POST_1201: "Không tìm thấy bài viết",
    POST_1202: "Bạn không có quyền chỉnh sửa bài viết này",
    POST_1203: "Bạn đã đánh giá bài viết này rồi",
    POST_1204: "Đánh giá phải từ 1 đến 5 sao",
    POST_1205: "Tiêu đề bài viết là bắt buộc",
    POST_1206: "Mô tả bài viết là bắt buộc",
    POST_1207: "Thẻ bài viết là bắt buộc",
    POST_1208: "Cần ít nhất một hình ảnh",
    POST_1209: "Bài viết đã có trong sổ tay",
    POST_1210: "Bài viết không có trong sổ tay của bạn",
    POST_1211: "Không thể chia sẻ lại bài viết của chính mình",
    POST_1212: "Bạn đã chia sẻ lại bài viết này rồi",

    // Comment Errors (1300-1399)
    COMMENT_1301: "Không tìm thấy bình luận",
    COMMENT_1302: "Bạn không có quyền chỉnh sửa bình luận này",
    COMMENT_1303: "Nội dung bình luận là bắt buộc",
    COMMENT_1304: "Bình luận quá dài (tối đa 500 ký tự)",

    // Recipe Errors (1400-1499)
    RECIPE_1401: "Không tìm thấy công thức",
    RECIPE_1402: "Nguyên liệu là bắt buộc",
    RECIPE_1403: "Các bước nấu là bắt buộc",
    RECIPE_1404: "Thời gian nấu không hợp lệ",
    RECIPE_1405: "Số khẩu phần không hợp lệ",
    RECIPE_1406: "Độ khó không hợp lệ. Phải là: dễ, trung bình hoặc khó",

    // Meal Plan Errors (1500-1599)
    MEAL_PLAN_1501: "Không tìm thấy kế hoạch bữa ăn",
    MEAL_PLAN_1502: "Bạn không có quyền chỉnh sửa kế hoạch này",
    MEAL_PLAN_1503: "Định dạng ngày không hợp lệ",
    MEAL_PLAN_1504: "Kế hoạch bữa ăn đã tồn tại cho ngày này",

    // File/Upload Errors (1600-1699)
    FILE_1601: "Không tìm thấy file",
    FILE_1602: "File quá lớn (tối đa 10MB)",
    FILE_1603: "Định dạng file không hợp lệ",
    FILE_1604: "Tải file lên thất bại",
    FILE_1605: "Định dạng ảnh không hợp lệ. Cho phép: JPG, PNG, GIF",
    FILE_1606: "Ảnh quá lớn (tối đa 5MB)",

    // Search Errors (1700-1799)
    SEARCH_1701: "Từ khóa tìm kiếm là bắt buộc",
    SEARCH_1702: "Từ khóa quá ngắn (tối thiểu 2 ký tự)",
    SEARCH_1703: "Không tìm thấy kết quả",

    // AI Errors (1800-1899)
    AI_1801: "Dịch vụ AI tạm thời không khả dụng",
    AI_1802: "Yêu cầu AI không hợp lệ",
    AI_1803: "Vượt quá giới hạn sử dụng AI. Vui lòng thử lại sau",
    AI_1804: "Nhận diện hình ảnh thất bại",
    AI_1805: "Tạo thực đơn thất bại",
    AI_1806: "Phân tích dinh dưỡng thất bại",

    // Notification Errors (1900-1999)
    NOTIFICATION_1901: "Không tìm thấy thông báo",
    NOTIFICATION_1902: "Thông báo đã được đánh dấu là đã đọc",

    // Validation Errors (2000-2099)
    VALIDATION_2001: "Xác thực thất bại",
    VALIDATION_2002: "Định dạng email không hợp lệ",
    VALIDATION_2003: "Trường này là bắt buộc",
    VALIDATION_2004: "Trường quá dài",
    VALIDATION_2005: "Trường quá ngắn",
    VALIDATION_2006: "Định dạng không hợp lệ",
    VALIDATION_2007: "Giá trị không hợp lệ",
    VALIDATION_2008: "Lỗi xác thực, thiếu dữ liệu",

    // Server Errors (5000-5099)
    SERVER_5001: "Lỗi máy chủ nội bộ",
    SERVER_5002: "Lỗi cơ sở dữ liệu",
    SERVER_5003: "Lỗi dịch vụ bên ngoài",
    SERVER_5004: "Hết thời gian chờ yêu cầu",

    // Rate Limiting (4000-4099)
    RATE_4001: "Vượt quá giới hạn. Vui lòng chậm lại",
    RATE_4002: "Quá nhiều yêu cầu. Vui lòng thử lại sau",

    // Generic
    UNKNOWN_ERROR: "Đã xảy ra lỗi không xác định",
};

