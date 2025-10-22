const { seedUsers } = require('./src/db/seed/user.seed');

/**
 * Master Seed Script
 * Runs all seed files in order
 */

async function runAllSeeds() {
    console.log('Starting database seeding...\n');

    try {
        // 1. Seed Users
        console.log('Seeding Users...');
        await seedUsers();


        console.log(' All seeds completed successfully!\n');
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}

// Run seeds
runAllSeeds();

