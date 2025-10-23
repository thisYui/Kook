const { PrismaClient } = require('@prisma/client');
const { seedAdminAccounts } = require('./admin.init');
const { seedIngredientCatalog } = require('./ingredient_catalog.init');
const { seedTags } = require('./tag.init');
//const { seedBadges } = require('./badge.init');

const prisma = new PrismaClient();

/**
 * Master initialization script
 * Runs all seed files in the correct order
 */

async function runAllSeeds() {
    console.log('Starting Kook Database Initialization...\n');
    console.log('═'.repeat(60));

    try {
        // 1. Seed Admin Accounts
        console.log('\nStep 1/4: Seeding Admin Accounts...');
        console.log('─'.repeat(60));
        await seedAdminAccounts();

        // 2. Seed Ingredient Catalog
        console.log('\nStep 2/4: Seeding Ingredient Catalog...');
        console.log('─'.repeat(60));
        await seedIngredientCatalog();

        // 3. Seed Tags
        console.log('\nStep 3/4: Seeding Tags...');
        console.log('─'.repeat(60));
        await seedTags();

        // 4. Seed Badges
        console.log('\nStep 4/4: Seeding Badges...');
        console.log('─'.repeat(60));
        //await seedBadges();

        // Summary
        console.log('\n' + '═'.repeat(60));
        console.log('\n✨ DATABASE INITIALIZATION COMPLETED! ✨\n');
        console.log('Summary:');

        const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
        const ingredientCount = await prisma.ingredientCatalog.count();
        const tagCount = await prisma.tag.count();
        const badgeCount = await prisma.badge.count();

        console.log(`Admin Accounts: ${adminCount}`);
        console.log(`Ingredients: ${ingredientCount}`);
        console.log(`Tags: ${tagCount}`);
        console.log(`Badges: ${badgeCount}`);

        console.log('\nYour Kook platform is ready to use!');
        console.log('\nNext Steps:');
        console.log('   1. Run user seed: npm run seed:users');
        console.log('   2. Start backend: npm run dev');
        console.log('   3. Access admin panel with: admin1@kook.com / Admin@123');
        console.log('\n' + '═'.repeat(60) + '\n');

    } catch (error) {
        console.error('\nERROR during initialization:', error);
        console.error('\nTip: Check if database is running and migrations are up to date.');
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run if called directly
if (require.main === module) {
    runAllSeeds()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error('Failed to initialize database:', error);
            process.exit(1);
        });
}

module.exports = { runAllSeeds };

