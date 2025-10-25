const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Tag Data - Comprehensive list of cooking tags
 * Includes: Countries, Cuisines, Cooking Methods, Meals, Occasions, Diets, etc.
 */

const tags = [
    // ===== COUNTRIES & REGIONS (Quốc gia & Vùng miền) =====
    { name: 'Việt Nam', slug: 'viet-nam' },
    { name: 'Miền Bắc', slug: 'mien-bac' },
    { name: 'Miền Nam', slug: 'mien-nam' },
    { name: 'Miền Trung', slug: 'mien-trung' },
    { name: 'Hà Nội', slug: 'ha-noi' },
    { name: 'Sài Gòn', slug: 'sai-gon' },
    { name: 'Huế', slug: 'hue' },
    { name: 'Trung Quốc', slug: 'trung-quoc' },
    { name: 'Nhật Bản', slug: 'nhat-ban' },
    { name: 'Hàn Quốc', slug: 'han-quoc' },
    { name: 'Thái Lan', slug: 'thai-lan' },
    { name: 'Ấn Độ', slug: 'an-do' },
    { name: 'Ý', slug: 'y' },
    { name: 'Pháp', slug: 'phap' },
    { name: 'Mỹ', slug: 'my' },
    { name: 'Mexico', slug: 'mexico' },
    { name: 'Tây Ban Nha', slug: 'tay-ban-nha' },
    { name: 'Địa Trung Hải', slug: 'dia-trung-hai' },
    { name: 'Đông Nam Á', slug: 'dong-nam-a' },
    { name: 'Trung Đông', slug: 'trung-dong' },
    { name: 'Caribbean', slug: 'caribbean' },
    { name: 'Nam Mỹ', slug: 'nam-my' },

    // ===== CUISINE TYPES (Loại ẩm thực) =====
    { name: 'Ẩm thực Việt', slug: 'am-thuc-viet' },
    { name: 'Ẩm thực Châu Á', slug: 'am-thuc-chau-a' },
    { name: 'Ẩm thực Âu', slug: 'am-thuc-au' },
    { name: 'Ẩm thực Fusion', slug: 'am-thuc-fusion' },
    { name: 'Ẩm thực Đường phố', slug: 'am-thuc-duong-pho' },
    { name: 'Ẩm thực Nhà hàng', slug: 'am-thuc-nha-hang' },
    { name: 'Ẩm thực Gia đình', slug: 'am-thuc-gia-dinh' },
    { name: 'Ẩm thực Truyền thống', slug: 'am-thuc-truyen-thong' },
    { name: 'Ẩm thực Hiện đại', slug: 'am-thuc-hien-dai' },
    { name: 'Ẩm thực Chay', slug: 'am-thuc-chay' },
    { name: 'Ẩm thực Hải sản', slug: 'am-thuc-hai-san' },
    { name: 'BBQ', slug: 'bbq' },
    { name: 'Dim Sum', slug: 'dim-sum' },
    { name: 'Sushi', slug: 'sushi' },
    { name: 'Ramen', slug: 'ramen' },
    { name: 'Curry', slug: 'curry' },
    { name: 'Pizza', slug: 'pizza' },
    { name: 'Pasta', slug: 'pasta' },
    { name: 'Taco', slug: 'taco' },
    { name: 'Burger', slug: 'burger' },
    { name: 'Sandwich', slug: 'sandwich' },
    { name: 'Salad', slug: 'salad' },
    { name: 'Soup', slug: 'soup' },

    // ===== COOKING METHODS (Phương pháp nấu) =====
    { name: 'Nướng', slug: 'nuong' },
    { name: 'Chiên', slug: 'chien' },
    { name: 'Xào', slug: 'xao' },
    { name: 'Luộc', slug: 'luoc' },
    { name: 'Hấp', slug: 'hap' },
    { name: 'Kho', slug: 'kho' },
    { name: 'Rim', slug: 'rim' },
    { name: 'Nấu', slug: 'nau' },
    { name: 'Hầm', slug: 'ham' },
    { name: 'Ướp', slug: 'uop' },
    { name: 'Muối', slug: 'muoi' },
    { name: 'Ngâm', slug: 'ngam' },
    { name: 'Rang', slug: 'rang' },
    { name: 'Quay', slug: 'quay' },
    { name: 'Nấu chậm', slug: 'nau-cham' },
    { name: 'Nấu áp suất', slug: 'nau-ap-suat' },
    { name: 'Nướng lò', slug: 'nuong-lo' },
    { name: 'Nướng than', slug: 'nuong-than' },
    { name: 'Chiên giòn', slug: 'chien-gion' },
    { name: 'Chiên không dầu', slug: 'chien-khong-dau' },
    { name: 'Sous Vide', slug: 'sous-vide' },
    { name: 'Smoking', slug: 'smoking' },
    { name: 'Blanching', slug: 'blanching' },
    { name: 'Sautéing', slug: 'sauteing' },
    { name: 'Deep Frying', slug: 'deep-frying' },
    { name: 'Stir Frying', slug: 'stir-frying' },
    { name: 'Grilling', slug: 'grilling' },
    { name: 'Roasting', slug: 'roasting' },
    { name: 'Baking', slug: 'baking' },
    { name: 'Steaming', slug: 'steaming' },
    { name: 'Boiling', slug: 'boiling' },
    { name: 'Poaching', slug: 'poaching' },
    { name: 'Braising', slug: 'braising' },

    // ===== MEAL TYPES (Bữa ăn) =====
    { name: 'Bữa sáng', slug: 'bua-sang' },
    { name: 'Bữa trưa', slug: 'bua-trua' },
    { name: 'Bữa tối', slug: 'bua-toi' },
    { name: 'Bữa phụ', slug: 'bua-phu' },
    { name: 'Ăn vặt', slug: 'an-vat' },
    { name: 'Món khai vị', slug: 'mon-khai-vi' },
    { name: 'Món chính', slug: 'mon-chinh' },
    { name: 'Món tráng miệng', slug: 'mon-trang-mieng' },
    { name: 'Đồ uống', slug: 'do-uong' },
    { name: 'Cocktail', slug: 'cocktail' },
    { name: 'Smoothie', slug: 'smoothie' },
    { name: 'Trà', slug: 'tra' },
    { name: 'Cà phê', slug: 'ca-phe' },
    { name: 'Nước ép', slug: 'nuoc-ep' },
    { name: 'Brunch', slug: 'brunch' },
    { name: 'High Tea', slug: 'high-tea' },
    { name: 'Midnight Snack', slug: 'midnight-snack' },

    // ===== DISH TYPES (Loại món) =====
    { name: 'Phở', slug: 'pho' },
    { name: 'Bún', slug: 'bun' },
    { name: 'Cơm', slug: 'com' },
    { name: 'Miến', slug: 'mien' },
    { name: 'Mì', slug: 'mi' },
    { name: 'Bánh', slug: 'banh' },
    { name: 'Chè', slug: 'che' },
    { name: 'Gỏi', slug: 'goi' },
    { name: 'Canh', slug: 'canh' },
    { name: 'Lẩu', slug: 'lau' },
    { name: 'Nem', slug: 'nem' },
    { name: 'Chả', slug: 'cha' },
    { name: 'Xôi', slug: 'xoi' },
    { name: 'Bánh mì', slug: 'banh-mi' },
    { name: 'Bánh bao', slug: 'banh-bao' },
    { name: 'Bánh cuốn', slug: 'banh-cuon' },
    { name: 'Bánh xèo', slug: 'banh-xeo' },
    { name: 'Bánh tráng', slug: 'banh-trang' },
    { name: 'Bánh chưng', slug: 'banh-chung' },
    { name: 'Bánh tét', slug: 'banh-tet' },
    { name: 'Bánh ngọt', slug: 'banh-ngot' },
    { name: 'Kem', slug: 'kem' },
    { name: 'Pudding', slug: 'pudding' },
    { name: 'Mousse', slug: 'mousse' },
    { name: 'Tiramisu', slug: 'tiramisu' },
    { name: 'Cheesecake', slug: 'cheesecake' },
    { name: 'Brownies', slug: 'brownies' },
    { name: 'Cookies', slug: 'cookies' },
    { name: 'Cupcake', slug: 'cupcake' },
    { name: 'Tart', slug: 'tart' },
    { name: 'Pie', slug: 'pie' },

    // ===== MAIN INGREDIENTS (Nguyên liệu chính) =====
    { name: 'Thịt bò', slug: 'thit-bo' },
    { name: 'Thịt lợn', slug: 'thit-lon' },
    { name: 'Thịt gà', slug: 'thit-ga' },
    { name: 'Hải sản', slug: 'hai-san' },
    { name: 'Cá', slug: 'ca' },
    { name: 'Tôm', slug: 'tom' },
    { name: 'Mực', slug: 'muc' },
    { name: 'Cua', slug: 'cua' },
    { name: 'Trứng', slug: 'trung' },
    { name: 'Đậu phụ', slug: 'dau-phu' },
    { name: 'Rau củ', slug: 'rau-cu' },
    { name: 'Nấm', slug: 'nam' },
    { name: 'Gạo', slug: 'gao' },
    { name: 'Bột mì', slug: 'bot-mi' },
    { name: 'Sữa', slug: 'sua' },
    { name: 'Phô mai', slug: 'pho-mai' },
    { name: 'Sô cô la', slug: 'so-co-la' },
    { name: 'Trái cây', slug: 'trai-cay' },

    // ===== DIETARY PREFERENCES (Chế độ ăn) =====
    { name: 'Ăn chay', slug: 'an-chay' },
    { name: 'Thuần chay', slug: 'thuan-chay' },
    { name: 'Không gluten', slug: 'khong-gluten' },
    { name: 'Không lactose', slug: 'khong-lactose' },
    { name: 'Low Carb', slug: 'low-carb' },
    { name: 'Keto', slug: 'keto' },
    { name: 'Paleo', slug: 'paleo' },
    { name: 'Whole 30', slug: 'whole-30' },
    { name: 'Địa Trung Hải', slug: 'dia-trung-hai-diet' },
    { name: 'Dash Diet', slug: 'dash-diet' },
    { name: 'Pescatarian', slug: 'pescatarian' },
    { name: 'Flexitarian', slug: 'flexitarian' },
    { name: 'Ăn sạch', slug: 'an-sach' },
    { name: 'Organic', slug: 'organic' },
    { name: 'Halal', slug: 'halal' },
    { name: 'Kosher', slug: 'kosher' },

    // ===== OCCASIONS & HOLIDAYS (Dịp lễ) =====
    { name: 'Tết Nguyên Đán', slug: 'tet-nguyen-dan' },
    { name: 'Rằm tháng Giêng', slug: 'ram-thang-gieng' },
    { name: 'Tết Trung Thu', slug: 'tet-trung-thu' },
    { name: 'Tết Đoan Ngọ', slug: 'tet-doan-ngo' },
    { name: 'Lễ Vu Lan', slug: 'le-vu-lan' },
    { name: 'Giỗ tổ', slug: 'gio-to' },
    { name: 'Sinh nhật', slug: 'sinh-nhat' },
    { name: 'Tiệc cưới', slug: 'tiec-cuoi' },
    { name: 'Tiệc buffet', slug: 'tiec-buffet' },
    { name: 'Picnic', slug: 'picnic' },
    { name: 'BBQ Party', slug: 'bbq-party' },
    { name: 'Giáng sinh', slug: 'giang-sinh' },
    { name: 'Halloween', slug: 'halloween' },
    { name: 'Valentine', slug: 'valentine' },
    { name: 'Easter', slug: 'easter' },
    { name: 'Thanksgiving', slug: 'thanksgiving' },
    { name: 'Năm mới', slug: 'nam-moi' },
    { name: 'Quốc khánh', slug: 'quoc-khanh' },

    // ===== SEASONS (Mùa) =====
    { name: 'Mùa xuân', slug: 'mua-xuan' },
    { name: 'Mùa hè', slug: 'mua-he' },
    { name: 'Mùa thu', slug: 'mua-thu' },
    { name: 'Mùa đông', slug: 'mua-dong' },
    { name: 'Mùa mưa', slug: 'mua-mua' },
    { name: 'Mùa nắng', slug: 'mua-nang' },

    // ===== HEALTH & WELLNESS (Sức khỏe) =====
    { name: 'Giảm cân', slug: 'giam-can' },
    { name: 'Tăng cân', slug: 'tang-can' },
    { name: 'Tăng cơ', slug: 'tang-co' },
    { name: 'Detox', slug: 'detox' },
    { name: 'Bổ dưỡng', slug: 'bo-duong' },
    { name: 'Tăng sức đề kháng', slug: 'tang-suc-de-khang' },
    { name: 'Thanh nhiệt', slug: 'thanh-nhiet' },
    { name: 'Dưỡng nhan', slug: 'duong-nhan' },
    { name: 'Cho người bệnh', slug: 'cho-nguoi-benh' },
    { name: 'Cho bà bầu', slug: 'cho-ba-bau' },
    { name: 'Cho trẻ em', slug: 'cho-tre-em' },
    { name: 'Cho người cao tuổi', slug: 'cho-nguoi-cao-tuoi' },
    { name: 'Người tiểu đường', slug: 'nguoi-tieu-duong' },
    { name: 'Huyết áp cao', slug: 'huyet-ap-cao' },
    { name: 'Tim mạch', slug: 'tim-mach' },
    { name: 'Tiêu hóa', slug: 'tieu-hoa' },
    { name: 'Đông y', slug: 'dong-y' },
    { name: 'Dược thiện', slug: 'duoc-thien' },

    // ===== DIFFICULTY LEVEL (Độ khó) =====
    { name: 'Dễ làm', slug: 'de-lam' },
    { name: 'Trung bình', slug: 'trung-binh' },
    { name: 'Khó', slug: 'kho' },
    { name: 'Chuyên nghiệp', slug: 'chuyen-nghiep' },
    { name: '5 phút', slug: '5-phut' },
    { name: '15 phút', slug: '15-phut' },
    { name: '30 phút', slug: '30-phut' },
    { name: '1 giờ', slug: '1-gio' },
    { name: 'Nấu nhanh', slug: 'nau-nhanh' },
    { name: 'Chuẩn bị đơn giản', slug: 'chuan-bi-don-gian' },
    { name: 'Một nồi', slug: 'mot-noi' },
    { name: 'Không cần bếp', slug: 'khong-can-bep' },

    // ===== BUDGET (Ngân sách) =====
    { name: 'Tiết kiệm', slug: 'tiet-kiem' },
    { name: 'Bình dân', slug: 'binh-dan' },
    { name: 'Cao cấp', slug: 'cao-cap' },
    { name: 'Sang trọng', slug: 'sang-trong' },
    { name: 'Dưới 50k', slug: 'duoi-50k' },
    { name: 'Dưới 100k', slug: 'duoi-100k' },
    { name: 'Dưới 200k', slug: 'duoi-200k' },

    // ===== COOKING STYLE (Phong cách) =====
    { name: 'Đơn giản', slug: 'don-gian' },
    { name: 'Tinh tế', slug: 'tinh-te' },
    { name: 'Rustic', slug: 'rustic' },
    { name: 'Hiện đại', slug: 'hien-dai' },
    { name: 'Cổ điển', slug: 'co-dien' },
    { name: 'Sáng tạo', slug: 'sang-tao' },
    { name: 'Nghệ thuật', slug: 'nghe-thuat' },
    { name: 'Minimalist', slug: 'minimalist' },
    { name: 'Comfort Food', slug: 'comfort-food' },
    { name: 'Soul Food', slug: 'soul-food' },
    { name: 'Gourmet', slug: 'gourmet' },
    { name: 'Bistro', slug: 'bistro' },
    { name: 'Fine Dining', slug: 'fine-dining' },
    { name: 'Casual Dining', slug: 'casual-dining' },
    { name: 'Fast Food', slug: 'fast-food' },

    // ===== SPECIAL FEATURES (Đặc điểm) =====
    { name: 'Trending', slug: 'trending' },
    { name: 'Viral', slug: 'viral' },
    { name: 'Được yêu thích', slug: 'duoc-yeu-thich' },
    { name: 'Top rated', slug: 'top-rated' },
    { name: 'Mới', slug: 'moi' },
    { name: 'Độc đáo', slug: 'doc-dao' },
    { name: 'Truyền thống', slug: 'truyen-thong' },
    { name: 'Bí quyết', slug: 'bi-quyet' },
    { name: 'Tự làm', slug: 'tu-lam' },
    { name: 'Handmade', slug: 'handmade' },
    { name: 'Homemade', slug: 'homemade' },
    { name: 'Restaurant Style', slug: 'restaurant-style' },
    { name: 'Bí mật đầu bếp', slug: 'bi-mat-dau-bep' },
    { name: 'Món ngon mỗi ngày', slug: 'mon-ngon-moi-ngay' },

    // ===== TEXTURE & TASTE (Kết cấu & Vị) =====
    { name: 'Giòn', slug: 'gion' },
    { name: 'Mềm', slug: 'mem' },
    { name: 'Dai', slug: 'dai' },
    { name: 'Ngọt', slug: 'ngot' },
    { name: 'Cay', slug: 'cay' },
    { name: 'Chua', slug: 'chua' },
    { name: 'Mặn', slug: 'man' },
    { name: 'Đắng', slug: 'dang' },
    { name: 'Béo', slug: 'beo' },
    { name: 'Thơm', slug: 'thom' },
    { name: 'Đậm đà', slug: 'dam-da' },
    { name: 'Thanh mát', slug: 'thanh-mat' },
    { name: 'Ấm áp', slug: 'am-ap' },
    { name: 'Sốt đặc', slug: 'sot-dac' },
    { name: 'Nước dùng', slug: 'nuoc-dung' },

    // ===== EQUIPMENT (Dụng cụ) =====
    { name: 'Nồi cơm điện', slug: 'noi-com-dien' },
    { name: 'Nồi áp suất', slug: 'noi-ap-suat' },
    { name: 'Nồi chiên không dầu', slug: 'noi-chien-khong-dau' },
    { name: 'Lò nướng', slug: 'lo-nuong' },
    { name: 'Lò vi sóng', slug: 'lo-vi-song' },
    { name: 'Máy xay', slug: 'may-xay' },
    { name: 'Máy trộn', slug: 'may-tron' },
    { name: 'Slow cooker', slug: 'slow-cooker' },
    { name: 'Instant Pot', slug: 'instant-pot' },
    { name: 'Grill', slug: 'grill' },
    { name: 'Wok', slug: 'wok' },
    { name: 'Cast Iron', slug: 'cast-iron' },

    // ===== STORAGE & PREPARATION (Bảo quản & Chuẩn bị) =====
    { name: 'Đông lạnh được', slug: 'dong-lanh-duoc' },
    { name: 'Bảo quản lâu', slug: 'bao-quan-lau' },
    { name: 'Ăn liền', slug: 'an-lien' },
    { name: 'Chuẩn bị trước', slug: 'chuan-bi-truoc' },
    { name: 'Meal prep', slug: 'meal-prep' },
    { name: 'Make ahead', slug: 'make-ahead' },
    { name: 'Leftover', slug: 'leftover' },
    { name: 'One pot', slug: 'one-pot' },
    { name: 'Sheet pan', slug: 'sheet-pan' },
    { name: 'No cook', slug: 'no-cook' },

    // ===== POPULAR DISHES (Món phổ biến) =====
    { name: 'Phở Hà Nội', slug: 'pho-ha-noi' },
    { name: 'Bún bò Huế', slug: 'bun-bo-hue' },
    { name: 'Cơm tấm', slug: 'com-tam' },
    { name: 'Bánh xèo', slug: 'banh-xeo-dish' },
    { name: 'Gỏi cuốn', slug: 'goi-cuon' },
    { name: 'Nem rán', slug: 'nem-ran' },
    { name: 'Bún chả', slug: 'bun-cha' },
    { name: 'Cao lầu', slug: 'cao-lau' },
    { name: 'Mì Quảng', slug: 'mi-quang' },
    { name: 'Hủ tiếu', slug: 'hu-tieu' },
    { name: 'Bún riêu', slug: 'bun-rieu' },
    { name: 'Bánh canh', slug: 'banh-canh' },
];

/**
 * Generate slug from name
 */
function generateSlug(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Seed tags
 */
async function seedTags() {
    console.log('Starting tags seeding...');

    try {
        let created = 0;
        let updated = 0;
        let skipped = 0;

        for (const tag of tags) {
            try {
                // Check if tag exists by either slug or name
                const existingTag = await prisma.tag.findFirst({
                    where: {
                        OR: [
                            { slug: tag.slug },
                            { name: tag.name }
                        ]
                    }
                });

                if (existingTag) {
                    // Update existing tag
                    await prisma.tag.update({
                        where: { id: existingTag.id },
                        data: {
                            name: tag.name,
                            slug: tag.slug,
                            is_active: true,
                        }
                    });
                    updated++;
                } else {
                    // Create new tag
                    await prisma.tag.create({
                        data: {
                            name: tag.name,
                            slug: tag.slug,
                            usage_count: 0,
                            is_active: true,
                        }
                    });
                    created++;
                }
            } catch (error) {
                // Handle any duplicate errors gracefully
                if (error.code === 'P2002') {
                    console.warn(`⚠ Skipping duplicate tag: ${tag.name} (${tag.slug})`);
                    skipped++;
                } else {
                    throw error;
                }
            }
        }

        const total = await prisma.tag.count();

        console.log(`\n✅ Tag seeding completed!`);
        console.log(`   📝 Created: ${created} new tags`);
        console.log(`   🔄 Updated: ${updated} existing tags`);
        if (skipped > 0) {
            console.log(`   ⏭️  Skipped: ${skipped} duplicate tags`);
        }
        console.log(`   📊 Total tags in database: ${total}`);

        console.log('\n📋 Tag Categories Summary:');
        console.log('   🌍 Countries & Regions: 22 tags');
        console.log('   🍜 Cuisine Types: 23 tags');
        console.log('   👨‍🍳 Cooking Methods: 33 tags');
        console.log('   🍽️  Meal Types: 17 tags');
        console.log('   🥘 Dish Types: 30 tags');
        console.log('   🥩 Main Ingredients: 18 tags');
        console.log('   🥗 Dietary Preferences: 16 tags');
        console.log('   🎉 Occasions & Holidays: 18 tags');
        console.log('   🌸 Seasons: 6 tags');
        console.log('   💪 Health & Wellness: 18 tags');
        console.log('   📈 Difficulty Levels: 12 tags');
        console.log('   💰 Budget: 7 tags');
        console.log('   🎨 Cooking Styles: 15 tags');
        console.log('   ⭐ Special Features: 14 tags');
        console.log('   😋 Texture & Taste: 15 tags');
        console.log('   🔧 Equipment: 12 tags');
        console.log('   📦 Storage & Preparation: 10 tags');
        console.log('   🏆 Popular Dishes: 12 tags');

    } catch (error) {
        console.error('❌ Error seeding tags:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedTags()
        .then(() => {
            console.log('\n✅ Tags seed completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Tags seed failed:', error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

module.exports = { seedTags, tags };
