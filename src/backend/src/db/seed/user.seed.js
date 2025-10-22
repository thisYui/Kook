const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

/**
 * User Seed Data
 * Creates 20 users with full information
 * Email: user1@kook.com -> user20@kook.com
 * Password: 123 (for all users)
 */

const users = [
    {
        name: 'Admin User',
        email: 'user1@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=1',
        language: 'en',
        theme: 'dark',
        bio: 'Platform administrator. Managing and moderating the Kook community.',
        role: 'ADMIN',
        is_verified: true,
    },
    {
        name: 'Emily Johnson',
        email: 'user2@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=2',
        language: 'en',
        theme: 'light',
        bio: 'Professional chef specializing in French cuisine. Sharing my culinary journey with you! 🍷👨‍🍳',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Michael Chen',
        email: 'user3@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
        language: 'en',
        theme: 'light',
        bio: 'Food blogger and recipe developer. Love experimenting with Asian fusion dishes. 🍜🥢',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Sarah Williams',
        email: 'user4@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=4',
        language: 'en',
        theme: 'light',
        bio: 'Vegan cooking enthusiast. Proving that plant-based food can be delicious! 🌱🥗',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'David Martinez',
        email: 'user5@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=5',
        language: 'en',
        theme: 'dark',
        bio: 'BBQ master and grill enthusiast. Nothing beats the smell of smoke and meat! 🔥🥩',
        role: 'MODERATOR',
        is_verified: true,
    },
    {
        name: 'Jessica Lee',
        email: 'user6@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=6',
        language: 'en',
        theme: 'light',
        bio: 'Pastry chef and dessert lover. Life is short, eat dessert first! 🧁🍰',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'James Wilson',
        email: 'user7@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=7',
        language: 'en',
        theme: 'dark',
        bio: 'Home cook learning new recipes every day. Cooking is my meditation. 🍳',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Maria Garcia',
        email: 'user8@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=8',
        language: 'vi',
        theme: 'light',
        bio: 'Mexican food expert. Bringing authentic flavors from my abuela\'s kitchen. 🌮🌶️',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Robert Brown',
        email: 'user9@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=9',
        language: 'en',
        theme: 'light',
        bio: 'Seafood specialist. Fresh catch, fresh recipes. 🦞🐟',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Linda Taylor',
        email: 'user10@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=10',
        language: 'en',
        theme: 'light',
        bio: 'Healthy meal prep advocate. Eating healthy doesn\'t have to be boring! 💪🥑',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Christopher Davis',
        email: 'user11@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=11',
        language: 'en',
        theme: 'dark',
        bio: 'Pizza connoisseur and Italian food lover. Making authentic Neapolitan pizza at home! 🍕',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Patricia Anderson',
        email: 'user12@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=12',
        language: 'en',
        theme: 'light',
        bio: 'Bread baker and sourdough enthusiast. The perfect loaf is worth the wait. 🍞',
        role: 'USER',
        is_verified: false,
    },
    {
        name: 'Daniel Thomas',
        email: 'user13@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=13',
        language: 'en',
        theme: 'dark',
        bio: 'Street food explorer. Discovering hidden gems in every corner. 🌭🍔',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Nancy Jackson',
        email: 'user14@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=14',
        language: 'vi',
        theme: 'light',
        bio: 'Vietnamese home cook. Sharing traditional family recipes passed down generations. 🍲',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Matthew White',
        email: 'user15@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=15',
        language: 'en',
        theme: 'light',
        bio: 'Coffee addict and brunch specialist. Breakfast is the most important meal! ☕🥞',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Karen Harris',
        email: 'user16@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=16',
        language: 'en',
        theme: 'light',
        bio: 'Gluten-free recipe creator. Delicious food for everyone! 🌾🚫',
        role: 'USER',
        is_verified: false,
    },
    {
        name: 'Kevin Martin',
        email: 'user17@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=17',
        language: 'en',
        theme: 'dark',
        bio: 'Spice lover and curry master. The hotter, the better! 🌶️🔥',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Betty Thompson',
        email: 'user18@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=18',
        language: 'en',
        theme: 'light',
        bio: 'Comfort food queen. Making soul-warming dishes that remind you of home. 🥘',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Steven Garcia',
        email: 'user19@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=19',
        language: 'en',
        theme: 'dark',
        bio: 'Sushi chef in training. Precision and patience in every roll. 🍣',
        role: 'USER',
        is_verified: true,
    },
    {
        name: 'Lisa Martinez',
        email: 'user20@kook.com',
        password: '123',
        avatar_url: 'https://i.pravatar.cc/150?img=20',
        language: 'vi',
        theme: 'light',
        bio: 'Smoothie bowl artist and healthy breakfast advocate. Start your day right! 🥤🍓',
        role: 'USER',
        is_verified: true,
    },
];

/**
 * Hash password
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

/**
 * Seed users
 */
async function seedUsers() {
    console.log('🌱 Starting user seeding...');

    try {
        // Check if users already exist
        const existingUsers = await prisma.user.count();
        if (existingUsers > 0) {
            console.log(`⚠️  Database already has ${existingUsers} users. Skipping seed.`);
            console.log('💡 To re-seed, please clear the User table first.');
            return;
        }

        // Create users
        let created = 0;
        for (const userData of users) {
            const { password, ...userInfo } = userData;
            const hashedPassword = await hashPassword(password);

            await prisma.user.create({
                data: {
                    ...userInfo,
                    password_hash: hashedPassword,
                    last_login: new Date(),
                    last_active: new Date(),
                }
            });

            created++;
            console.log(`✅ Created user: ${userInfo.email}`);
        }

        console.log(`\n✨ Successfully created ${created} users!`);
        console.log('\n📋 User Summary:');
        console.log(`   - Admins: ${users.filter(u => u.role === 'ADMIN').length}`);
        console.log(`   - Moderators: ${users.filter(u => u.role === 'MODERATOR').length}`);
        console.log(`   - Users: ${users.filter(u => u.role === 'USER').length}`);
        console.log(`   - Verified: ${users.filter(u => u.is_verified).length}`);
        console.log(`   - Unverified: ${users.filter(u => !u.is_verified).length}`);

        console.log('\n🔑 Login Credentials:');
        console.log('   Admin: user1@kook.com / 123');
        console.log('   User Examples:');
        console.log('     - user2@kook.com / 123');
        console.log('     - user3@kook.com / 123');
        console.log('     - ...');
        console.log('     - user20@kook.com / 123');
        console.log('   All passwords are: 123');
        console.log('   Email pattern: user[1-20]@kook.com');

    } catch (error) {
        console.error('❌ Error seeding users:', error);
        throw error;
    }
}

/**
 * Main function
 */
async function main() {
    await seedUsers();
}

// Run if executed directly
if (require.main === module) {
    main()
        .catch((error) => {
            console.error('❌ Fatal error:', error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
            console.log('\n👋 Database connection closed.');
        });
}

module.exports = { seedUsers, users };

