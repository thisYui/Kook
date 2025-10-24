const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const connectMongo = require('../../config/mongo');

const { seedUsers } = require('./user.seed');
const { seedFollows } = require('./follow.seed');
const { seedPosts } = require('./posts.seed');
const { seedUserAllergies } = require('./userAllergies.seed');
const { seedMealPlans } = require('./mealPlan.seed');

const prisma = new PrismaClient();

/**
 * Master Seed Script
 * Runs all seed files in order
 */

async function runAllSeeds() {
    console.log('🌱 Starting database seeding...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    try {
        // Connect to MongoDB first
        if (mongoose.connection.readyState === 0) {
            console.log('🔌 Connecting to MongoDB...');
            console.log('   URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/kook_db');

            await connectMongo();

            if (mongoose.connection.readyState !== 1) {
                throw new Error('❌ MongoDB connection failed! Please start MongoDB service first.');
            }

            console.log('✅ MongoDB connected successfully\n');
        }

        // 1. Seed Users
        console.log('👤 Step 1: Seeding Users...');
        await seedUsers();
        console.log('');

        // 2. Seed Follows
        console.log('👥 Step 2: Seeding Follow Relationships...');
        await seedFollows();
        console.log('');

        // 3. Seed Posts (includes recipes, ingredients, MongoDB details)
        console.log('📝 Step 3: Seeding Posts and Recipes...');
        await seedPosts();
        console.log('');

        // 4. Seed User Allergies
        console.log('🚨 Step 4: Seeding User Allergies...');
        await seedUserAllergies();
        console.log('');

        // 5. Seed Meal Plans
        console.log('🗓️  Step 5: Seeding Meal Plans...');
        await seedMealPlans();
        console.log('');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ All seeds completed successfully!\n');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    } finally {
        // Disconnect from databases
        await prisma.$disconnect();
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('👋 MongoDB disconnected.');
        }
        console.log('👋 Prisma disconnected.');
    }
}

// Run seeds
runAllSeeds();
