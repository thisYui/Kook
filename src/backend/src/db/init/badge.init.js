const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Badge Data - Achievement system for Kook platform
 * Badges are awarded based on user activities and milestones
 */

const badges = [
    // ===== RECIPE CREATOR BADGES (Huy hiệu người sáng tạo) =====
    {
        title: 'Tân Binh Bếp Núc',
        description: 'Chia sẻ công thức đầu tiên của bạn',
        icon_url: 'https://img.icons8.com/color/96/chef-hat.png',
        criteria: {
            type: 'post_count',
            min: 1,
            max: null
        },
        is_active: true
    },
    {
        title: 'Đầu Bếp Mới',
        description: 'Đã chia sẻ 5 công thức nấu ăn',
        icon_url: 'https://img.icons8.com/color/96/cooking-book.png',
        criteria: {
            type: 'post_count',
            min: 5,
            max: null
        },
        is_active: true
    },
    {
        title: 'Đầu Bếp Thành Thạo',
        description: 'Đã chia sẻ 25 công thức nấu ăn',
        icon_url: 'https://img.icons8.com/color/96/chef.png',
        criteria: {
            type: 'post_count',
            min: 25,
            max: null
        },
        is_active: true
    },
    {
        title: 'Bậc Thầy Bếp Núc',
        description: 'Đã chia sẻ 50 công thức nấu ăn',
        icon_url: 'https://img.icons8.com/color/96/master-chef.png',
        criteria: {
            type: 'post_count',
            min: 50,
            max: null
        },
        is_active: true
    },
    {
        title: 'Huyền Thoại Ẩm Thực',
        description: 'Đã chia sẻ 100 công thức nấu ăn',
        icon_url: 'https://img.icons8.com/color/96/trophy.png',
        criteria: {
            type: 'post_count',
            min: 100,
            max: null
        },
        is_active: true
    },

    // ===== RATING BADGES (Huy hiệu đánh giá cao) =====
    {
        title: 'Món Ngon Đầu Tiên',
        description: 'Có công thức đầu tiên được đánh giá 5 sao',
        icon_url: 'https://img.icons8.com/color/96/star.png',
        criteria: {
            type: 'five_star_posts',
            min: 1,
            max: null,
            rating_threshold: 4.5
        },
        is_active: true
    },
    {
        title: 'Đầu Bếp Được Yêu Thích',
        description: 'Có 5 công thức được đánh giá 5 sao',
        icon_url: 'https://img.icons8.com/color/96/medal.png',
        criteria: {
            type: 'five_star_posts',
            min: 5,
            max: null,
            rating_threshold: 4.5
        },
        is_active: true
    },
    {
        title: 'Chuyên Gia Ẩm Thực',
        description: 'Có 10 công thức được đánh giá 5 sao',
        icon_url: 'https://img.icons8.com/color/96/prize.png',
        criteria: {
            type: 'five_star_posts',
            min: 10,
            max: null,
            rating_threshold: 4.5
        },
        is_active: true
    },
    {
        title: 'Nghệ Nhân Ẩm Thực',
        description: 'Tổng số đánh giá từ người dùng đạt 100',
        icon_url: 'https://img.icons8.com/color/96/rating.png',
        criteria: {
            type: 'total_ratings_received',
            min: 100,
            max: null
        },
        is_active: true
    },
    {
        title: 'Siêu Sao Ẩm Thực',
        description: 'Tổng số đánh giá từ người dùng đạt 500',
        icon_url: 'https://img.icons8.com/color/96/star-filled.png',
        criteria: {
            type: 'total_ratings_received',
            min: 500,
            max: null
        },
        is_active: true
    },

    // ===== FOLLOWER BADGES (Huy hiệu người theo dõi) =====
    {
        title: 'Người Được Chú Ý',
        description: 'Có 10 người theo dõi',
        icon_url: 'https://img.icons8.com/color/96/user-group-man-man.png',
        criteria: {
            type: 'follower_count',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Người Có Tầm Ảnh Hưởng',
        description: 'Có 50 người theo dõi',
        icon_url: 'https://img.icons8.com/color/96/conference-call.png',
        criteria: {
            type: 'follower_count',
            min: 50,
            max: null
        },
        is_active: true
    },
    {
        title: 'Ngôi Sao Cộng Đồng',
        description: 'Có 100 người theo dõi',
        icon_url: 'https://img.icons8.com/color/96/crowd.png',
        criteria: {
            type: 'follower_count',
            min: 100,
            max: null
        },
        is_active: true
    },
    {
        title: 'Celebrity Chef',
        description: 'Có 500 người theo dõi',
        icon_url: 'https://img.icons8.com/color/96/rock-star.png',
        criteria: {
            type: 'follower_count',
            min: 500,
            max: null
        },
        is_active: true
    },
    {
        title: 'Huyền Thoại Kook',
        description: 'Có 1000 người theo dõi',
        icon_url: 'https://img.icons8.com/color/96/crown.png',
        criteria: {
            type: 'follower_count',
            min: 1000,
            max: null
        },
        is_active: true
    },

    // ===== VIEW COUNT BADGES (Huy hiệu lượt xem) =====
    {
        title: 'Món Ăn Viral',
        description: 'Có một công thức đạt 1000 lượt xem',
        icon_url: 'https://img.icons8.com/color/96/fire-element.png',
        criteria: {
            type: 'single_post_views',
            min: 1000,
            max: null
        },
        is_active: true
    },
    {
        title: 'Trending Recipe',
        description: 'Có một công thức đạt 5000 lượt xem',
        icon_url: 'https://img.icons8.com/color/96/arrow-up.png',
        criteria: {
            type: 'single_post_views',
            min: 5000,
            max: null
        },
        is_active: true
    },
    {
        title: 'Hiện Tượng Ẩm Thực',
        description: 'Tổng lượt xem tất cả công thức đạt 10,000',
        icon_url: 'https://img.icons8.com/color/96/visibility.png',
        criteria: {
            type: 'total_post_views',
            min: 10000,
            max: null
        },
        is_active: true
    },
    {
        title: 'Viral Chef',
        description: 'Tổng lượt xem tất cả công thức đạt 50,000',
        icon_url: 'https://img.icons8.com/color/96/rocket.png',
        criteria: {
            type: 'total_post_views',
            min: 50000,
            max: null
        },
        is_active: true
    },

    // ===== ENGAGEMENT BADGES (Huy hiệu tương tác) =====
    {
        title: 'Người Bình Luận Tích Cực',
        description: 'Đã bình luận 50 lần',
        icon_url: 'https://img.icons8.com/color/96/communication.png',
        criteria: {
            type: 'comment_count',
            min: 50,
            max: null
        },
        is_active: true
    },
    {
        title: 'Chuyên Gia Nhận Xét',
        description: 'Đã bình luận 200 lần',
        icon_url: 'https://img.icons8.com/color/96/chat.png',
        criteria: {
            type: 'comment_count',
            min: 200,
            max: null
        },
        is_active: true
    },
    {
        title: 'Người Chia Sẻ',
        description: 'Đã chia sẻ lại 10 công thức',
        icon_url: 'https://img.icons8.com/color/96/share.png',
        criteria: {
            type: 'repost_count',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Đại Sứ Ẩm Thực',
        description: 'Đã chia sẻ lại 50 công thức',
        icon_url: 'https://img.icons8.com/color/96/forward-arrow.png',
        criteria: {
            type: 'repost_count',
            min: 50,
            max: null
        },
        is_active: true
    },
    {
        title: 'Người Đánh Giá',
        description: 'Đã đánh giá 20 công thức',
        icon_url: 'https://img.icons8.com/color/96/like.png',
        criteria: {
            type: 'rating_given_count',
            min: 20,
            max: null
        },
        is_active: true
    },
    {
        title: 'Chuyên Gia Thẩm Định',
        description: 'Đã đánh giá 100 công thức',
        icon_url: 'https://img.icons8.com/color/96/thumbs-up.png',
        criteria: {
            type: 'rating_given_count',
            min: 100,
            max: null
        },
        is_active: true
    },

    // ===== COLLECTION BADGES (Huy hiệu sưu tập) =====
    {
        title: 'Người Sưu Tập',
        description: 'Đã lưu 10 công thức vào sổ tay',
        icon_url: 'https://img.icons8.com/color/96/book.png',
        criteria: {
            type: 'notebook_count',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Thư Viện Ẩm Thực',
        description: 'Đã lưu 50 công thức vào sổ tay',
        icon_url: 'https://img.icons8.com/color/96/books.png',
        criteria: {
            type: 'notebook_count',
            min: 50,
            max: null
        },
        is_active: true
    },
    {
        title: 'Bách Khoa Toàn Thư',
        description: 'Đã lưu 200 công thức vào sổ tay',
        icon_url: 'https://img.icons8.com/color/96/library.png',
        criteria: {
            type: 'notebook_count',
            min: 200,
            max: null
        },
        is_active: true
    },

    // ===== SPECIAL BADGES (Huy hiệu đặc biệt) =====
    {
        title: 'Thành Viên Sáng Lập',
        description: 'Là một trong những người dùng đầu tiên của Kook',
        icon_url: 'https://img.icons8.com/color/96/verified-account.png',
        criteria: {
            type: 'early_adopter',
            register_before: '2025-12-31',
            max: null
        },
        is_active: true
    },
    {
        title: 'Người Hoạt Động Tích Cực',
        description: 'Đăng nhập liên tục 7 ngày',
        icon_url: 'https://img.icons8.com/color/96/calendar.png',
        criteria: {
            type: 'consecutive_login_days',
            min: 7,
            max: null
        },
        is_active: true
    },
    {
        title: 'Chiến Binh Ẩm Thực',
        description: 'Đăng nhập liên tục 30 ngày',
        icon_url: 'https://img.icons8.com/color/96/fire.png',
        criteria: {
            type: 'consecutive_login_days',
            min: 30,
            max: null
        },
        is_active: true
    },
    {
        title: 'Huyền Thoại Streak',
        description: 'Đăng nhập liên tục 100 ngày',
        icon_url: 'https://img.icons8.com/color/96/lightning-bolt.png',
        criteria: {
            type: 'consecutive_login_days',
            min: 100,
            max: null
        },
        is_active: true
    },
    {
        title: 'Chuyên Gia Kế Hoạch Bữa Ăn',
        description: 'Đã tạo 5 kế hoạch bữa ăn',
        icon_url: 'https://img.icons8.com/color/96/meal-plan.png',
        criteria: {
            type: 'meal_plan_count',
            min: 5,
            max: null
        },
        is_active: true
    },

    // ===== CATEGORY SPECIALIST BADGES (Huy hiệu chuyên gia theo danh mục) =====
    {
        title: 'Chuyên Gia Món Chay',
        description: 'Đã chia sẻ 10 công thức món chay',
        icon_url: 'https://img.icons8.com/color/96/vegetarian-food.png',
        criteria: {
            type: 'category_specialist',
            category: 'vegetarian',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Bậc Thầy Hải Sản',
        description: 'Đã chia sẻ 10 công thức hải sản',
        icon_url: 'https://img.icons8.com/color/96/crab.png',
        criteria: {
            type: 'category_specialist',
            category: 'seafood',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Chuyên Gia Bánh Ngọt',
        description: 'Đã chia sẻ 10 công thức bánh ngọt',
        icon_url: 'https://img.icons8.com/color/96/birthday-cake.png',
        criteria: {
            type: 'category_specialist',
            category: 'dessert',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Đầu Bếp BBQ',
        description: 'Đã chia sẻ 10 công thức BBQ/nướng',
        icon_url: 'https://img.icons8.com/color/96/barbecue.png',
        criteria: {
            type: 'category_specialist',
            category: 'bbq',
            min: 10,
            max: null
        },
        is_active: true
    },
    {
        title: 'Bậc Thầy Nấu Nhanh',
        description: 'Đã chia sẻ 15 công thức nấu dưới 30 phút',
        icon_url: 'https://img.icons8.com/color/96/speed.png',
        criteria: {
            type: 'quick_recipe_specialist',
            max_cooking_time: 30,
            min: 15,
            max: null
        },
        is_active: true
    },

    // ===== ADMIN/MODERATOR BADGES (Huy hiệu quản trị) =====
    {
        title: 'Quản Trị Viên',
        description: 'Thành viên của đội ngũ quản trị Kook',
        icon_url: 'https://img.icons8.com/color/96/administrator-male.png',
        criteria: {
            type: 'role',
            role: 'ADMIN',
            max: null
        },
        is_active: true
    },
    {
        title: 'Người Kiểm Duyệt',
        description: 'Thành viên của đội ngũ kiểm duyệt Kook',
        icon_url: 'https://img.icons8.com/color/96/policeman-male.png',
        criteria: {
            type: 'role',
            role: 'MODERATOR',
            max: null
        },
        is_active: true
    },

    // ===== SEASONAL/EVENT BADGES (Huy hiệu mùa/sự kiện) =====
    {
        title: 'Đầu Bếp Tết 2025',
        description: 'Tham gia sự kiện Tết Nguyên Đán 2025',
        icon_url: 'https://img.icons8.com/color/96/lunar-new-year.png',
        criteria: {
            type: 'event_participation',
            event_id: 'tet_2025',
            max: null
        },
        is_active: false  // Sẽ active khi có sự kiện
    },
    {
        title: 'Mùa Thu Vàng',
        description: 'Chia sẻ công thức đặc biệt mùa thu',
        icon_url: 'https://img.icons8.com/color/96/autumn.png',
        criteria: {
            type: 'seasonal',
            season: 'autumn',
            min: 5,
            max: null
        },
        is_active: false
    },
    {
        title: 'Giáng Sinh Ấm Áp',
        description: 'Tham gia sự kiện Giáng Sinh',
        icon_url: 'https://img.icons8.com/color/96/christmas.png',
        criteria: {
            type: 'event_participation',
            event_id: 'christmas_2025',
            max: null
        },
        is_active: false
    },
];

/**
 * Seed badges
 */
async function seedBadges() {
    console.log('🌱 Starting badges seeding...');

    try {
        // Check if badges already exist
        const existingCount = await prisma.badge.count();
        if (existingCount > 0) {
            console.log(`⚠️  Database already has ${existingCount} badges. Skipping seed.`);
            console.log('💡 To re-seed, please clear the badges table first.');
            return;
        }

        // Create badges
        let created = 0;
        for (const badge of badges) {
            await prisma.badge.create({
                data: badge
            });
            created++;
            console.log(`✅ Created badge: ${badge.title}`);
        }

        console.log(`\n✨ Successfully created ${created} badges!`);
        console.log('\n📋 Badge Categories Summary:');
        console.log('   ✅ Recipe Creator Badges: 5 badges');
        console.log('   ✅ Rating Badges: 5 badges');
        console.log('   ✅ Follower Badges: 5 badges');
        console.log('   ✅ View Count Badges: 4 badges');
        console.log('   ✅ Engagement Badges: 6 badges');
        console.log('   ✅ Collection Badges: 3 badges');
        console.log('   ✅ Special Badges: 5 badges');
        console.log('   ✅ Category Specialist Badges: 5 badges');
        console.log('   ✅ Admin/Moderator Badges: 2 badges');
        console.log('   ✅ Seasonal/Event Badges: 3 badges (inactive)');
        console.log('\n📊 Badge Criteria Types:');
        console.log('   - post_count: Số lượng công thức chia sẻ');
        console.log('   - five_star_posts: Công thức 5 sao');
        console.log('   - total_ratings_received: Tổng số đánh giá nhận được');
        console.log('   - follower_count: Số người theo dõi');
        console.log('   - single_post_views: Lượt xem của một bài');
        console.log('   - total_post_views: Tổng lượt xem');
        console.log('   - comment_count: Số bình luận');
        console.log('   - repost_count: Số lần chia sẻ lại');
        console.log('   - rating_given_count: Số đánh giá đã cho');
        console.log('   - notebook_count: Số công thức đã lưu');
        console.log('   - consecutive_login_days: Số ngày đăng nhập liên tục');
        console.log('   - category_specialist: Chuyên gia danh mục');
        console.log('   - role: Vai trò trong hệ thống');

    } catch (error) {
        console.error('❌ Error seeding badges:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedBadges()
        .then(() => {
            console.log('\n✅ Badges seed completed!');
            prisma.$disconnect();
        })
        .catch((error) => {
            console.error('❌ Seed failed:', error);
            prisma.$disconnect();
            process.exit(1);
        });
}

module.exports = { seedBadges, badges };

