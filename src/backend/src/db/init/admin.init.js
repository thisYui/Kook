const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { BCRYPT_SALT_ROUNDS } = require('../../constants');

const prisma = new PrismaClient();

/**
 * Admin Account Data
 * Creates 5 admin accounts with full information
 * Email: admin1@kook.com -> admin5@kook.com
 * Password: Admin@123 (for all admins)
 */

const adminAccounts = [
    {
        name: 'Admin Super',
        email: 'admin1@kook.com',
        password: 'Admin@123',
        avatar_url: 'https://i.pravatar.cc/150?img=1',
        language: 'vi',
        theme: 'dark',
        bio: 'Quản trị viên cấp cao của hệ thống Kook. Quản lý toàn bộ hoạt động của nền tảng.',
        role: 'ADMIN',
        is_verified: true,
    },
    {
        name: 'Admin Content Manager',
        email: 'admin2@kook.com',
        password: 'Admin@123',
        avatar_url: 'https://i.pravatar.cc/150?img=2',
        language: 'vi',
        theme: 'light',
        bio: 'Quản lý nội dung và kiểm duyệt công thức trên nền tảng Kook.',
        role: 'ADMIN',
        is_verified: true,
    },
    {
        name: 'Admin User Support',
        email: 'admin3@kook.com',
        password: 'Admin@123',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
        language: 'en',
        theme: 'light',
        bio: 'Hỗ trợ người dùng và xử lý các vấn đề phát sinh trên nền tảng.',
        role: 'ADMIN',
        is_verified: true,
    },
    {
        name: 'Admin System Monitor',
        email: 'admin4@kook.com',
        password: 'Admin@123',
        avatar_url: 'https://i.pravatar.cc/150?img=4',
        language: 'vi',
        theme: 'dark',
        bio: 'Giám sát hệ thống, theo dõi hiệu suất và bảo mật của nền tảng Kook.',
        role: 'ADMIN',
        is_verified: true,
    },
    {
        name: 'Admin Analytics',
        email: 'admin5@kook.com',
        password: 'Admin@123',
        avatar_url: 'https://i.pravatar.cc/150?img=5',
        language: 'en',
        theme: 'light',
        bio: 'Phân tích dữ liệu và báo cáo thống kê hoạt động của nền tảng.',
        role: 'ADMIN',
        is_verified: true,
    },
];

/**
 * Hash password
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
}

/**
 * Seed admin accounts
 */
async function seedAdminAccounts() {
    console.log('Starting admin accounts seeding...');

    try {
        // Check if admin accounts already exist
        const existingAdmins = await prisma.user.count({
            where: { role: 'ADMIN' }
        });

        if (existingAdmins > 0) {
            console.log(`Database already has ${existingAdmins} admin accounts. Skipping seed.`);
            console.log('To re-seed, please clear admin accounts first.');
            return;
        }

        // Create admin accounts
        let created = 0;
        for (const adminData of adminAccounts) {
            const { password, ...adminInfo } = adminData;
            const hashedPassword = await hashPassword(password);

            await prisma.user.create({
                data: {
                    ...adminInfo,
                    password_hash: hashedPassword,
                    last_login: new Date(),
                    last_active: new Date(),
                }
            });

            created++;
            console.log(`Created admin: ${adminInfo.email}`);
        }

        console.log(`\nSuccessfully created ${created} admin accounts!`);
        console.log('\nAdmin Account Summary:');
        console.log('   Email Format: admin1@kook.com -> admin5@kook.com');
        console.log('   Password: Admin@123 (for all admins)');
        console.log('   Role: ADMIN');
        console.log('   Status: Verified & Active');
        console.log('\nIMPORTANT: Please change admin passwords after first login!');

    } catch (error) {
        console.error('Error seeding admin accounts:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedAdminAccounts()
        .then(() => {
            console.log('\nAdmin accounts seed completed!');
            prisma.$disconnect();
        })
        .catch((error) => {
            console.error('Seed failed:', error);
            prisma.$disconnect();
            process.exit(1);
        });
}

module.exports = { seedAdminAccounts, adminAccounts };

