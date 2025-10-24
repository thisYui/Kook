const { PrismaClient } = require('@prisma/client');
const MealPlan = require('../../models/mongo/MealPlan');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectMongo = require('../../config/mongo');

const prisma = new PrismaClient();

/**
 * Meal Plan Templates
 * Different meal plan goals and styles
 * Expanded with more diverse meal planning approaches
 */
const mealPlanTemplates = [
    {
        goal: 'Weight Loss',
        prompt: 'Create a balanced meal plan focused on healthy weight loss with calorie control',
        isActive: true
    },
    {
        goal: 'Muscle Building',
        prompt: 'High protein meal plan for muscle growth and strength training',
        isActive: true
    },
    {
        goal: 'Vegetarian Diet',
        prompt: 'Plant-based meal plan with complete protein sources',
        isActive: true
    },
    {
        goal: 'Family Meals',
        prompt: 'Family-friendly meal plan with variety and kid-approved recipes',
        isActive: true
    },
    {
        goal: 'Quick & Easy',
        prompt: 'Meal plan with recipes under 30 minutes for busy weekdays',
        isActive: true
    },
    {
        goal: 'Low Carb',
        prompt: 'Low carbohydrate meal plan for keto or low-carb lifestyle',
        isActive: false
    },
    {
        goal: 'Mediterranean Diet',
        prompt: 'Heart-healthy Mediterranean-style meal plan with olive oil, fish, and vegetables',
        isActive: true
    },
    {
        goal: 'Vegan',
        prompt: 'Complete vegan meal plan with no animal products',
        isActive: true
    },
    {
        goal: 'Diabetic-Friendly',
        prompt: 'Blood sugar-friendly meal plan with controlled carbohydrates',
        isActive: true
    },
    {
        goal: 'High Protein',
        prompt: 'Protein-rich meal plan for active lifestyle and fitness',
        isActive: true
    },
    {
        goal: 'Gluten-Free',
        prompt: 'Gluten-free meal plan for celiac or gluten sensitivity',
        isActive: true
    },
    {
        goal: 'Budget-Friendly',
        prompt: 'Cost-effective meal plan with affordable ingredients',
        isActive: true
    },
    {
        goal: 'Heart Health',
        prompt: 'Heart-healthy meal plan low in sodium and saturated fats',
        isActive: true
    },
    {
        goal: 'Anti-Inflammatory',
        prompt: 'Anti-inflammatory meal plan with omega-3 rich foods',
        isActive: true
    },
    {
        goal: 'Paleo Diet',
        prompt: 'Paleo-style meal plan with whole foods and no processed items',
        isActive: true
    },
    {
        goal: 'Asian Fusion',
        prompt: 'Asian-inspired meal plan with diverse flavors and techniques',
        isActive: true
    },
    {
        goal: 'Meal Prep',
        prompt: 'Meal prep-friendly plan with batch cooking and storage tips',
        isActive: true
    },
    {
        goal: 'Low Sodium',
        prompt: 'Low sodium meal plan for blood pressure management',
        isActive: true
    },
    {
        goal: 'High Fiber',
        prompt: 'High fiber meal plan for digestive health',
        isActive: true
    },
    {
        goal: 'Intermittent Fasting',
        prompt: 'IF-compatible meal plan with eating window considerations',
        isActive: false
    },
];

/**
 * Get Monday of the current week
 */
function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

/**
 * Get random recipes from database
 */
async function getRandomRecipes(count = 21) {
    const recipes = await prisma.recipe.findMany({
        select: { id: true },
        take: 100
    });

    if (recipes.length === 0) {
        throw new Error('No recipes found in database. Please seed recipes first.');
    }

    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, recipes.length));
}

/**
 * Generate meal plan for a week
 * Creates 3 main meals + optional snacks for some days
 */
function generateWeekMeals(recipes) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mainMealTypes = ['Breakfast', 'Lunch', 'Dinner'];
    const meals = {};

    let recipeIndex = 0;

    for (const day of days) {
        meals[day] = [];

        // Add main meals
        for (const mealType of mainMealTypes) {
            if (recipeIndex < recipes.length) {
                meals[day].push({
                    meal_type: mealType,
                    recipe_id: recipes[recipeIndex].id
                });
                recipeIndex++;
            }
        }

        // Add snack on some days (Wed, Fri, Sun) if we have enough recipes
        const snackDays = ['Wednesday', 'Friday', 'Sunday'];
        if (snackDays.includes(day) && recipeIndex < recipes.length) {
            meals[day].push({
                meal_type: 'Snack',
                recipe_id: recipes[recipeIndex].id
            });
            recipeIndex++;
        }
    }

    return meals;
}

/**
 * Create meal plan for a user
 */
async function createMealPlan(userId, template, weekOffset = 0) {
    try {
        // Calculate week start date
        const today = new Date();
        const monday = getMonday(today);
        monday.setDate(monday.getDate() + (weekOffset * 7));

        // Get random recipes
        const recipes = await getRandomRecipes(21);

        // Create MealPlanMeta in PostgreSQL
        const mealPlanMeta = await prisma.mealPlanMeta.create({
            data: {
                user_id: userId,
                goal: template.goal,
                promt: template.prompt,
                day_start: monday,
                version: 1,
                is_active: template.isActive
            }
        });

        // Generate meals for the week
        const meals = generateWeekMeals(recipes);

        // Create MealPlan in MongoDB
        const mealPlan = new MealPlan({
            plan_id: mealPlanMeta.id,
            user_id: userId,
            week_start: monday,
            meals: meals,
            version: 1
        });

        await mealPlan.save();

        return { meta: mealPlanMeta, detail: mealPlan };

    } catch (error) {
        console.error('Error creating meal plan:', error);
        throw error;
    }
}

/**
 * User meal plan assignments
 * Some users have multiple meal plans (current and archived)
 * Expanded to include more users with diverse meal planning goals
 */
const userMealPlanAssignments = {
    // Users with multiple plans (showing plan evolution over time)
    'user1@kook.com': [0, 6, 12],         // Admin: Weight Loss → Mediterranean → Heart Health
    'user2@kook.com': [1, 9, 5],          // Emily: Muscle Building → High Protein → Low Carb (archived)
    'user3@kook.com': [2, 7],             // Michael: Vegetarian → Vegan
    'user4@kook.com': [0, 13],            // Sarah: Weight Loss → Anti-Inflammatory
    'user5@kook.com': [1, 16],            // David: Muscle Building → Meal Prep

    // Users with specific dietary needs
    'user6@kook.com': [10, 3],            // Jessica (gluten allergy): Gluten-Free → Family Meals
    'user7@kook.com': [6, 12],            // James (lactose intolerant): Mediterranean → Heart Health
    'user8@kook.com': [7, 13],            // Maria: Vegan → Anti-Inflammatory
    'user9@kook.com': [6, 17],            // Robert: Mediterranean → Low Sodium
    'user10@kook.com': [2, 14],           // Linda (tree nut allergy): Vegetarian → Paleo

    // Users with fitness goals
    'user11@kook.com': [1, 9],            // Christopher: Muscle Building → High Protein
    'user12@kook.com': [4, 16],           // Patricia: Quick & Easy → Meal Prep
    'user13@kook.com': [0, 18],           // Daniel: Weight Loss → High Fiber

    // Users with health conditions
    'user14@kook.com': [8, 17],           // Nancy: Diabetic-Friendly → Low Sodium
    'user15@kook.com': [3, 11],           // Matthew (nut allergy): Family Meals → Budget-Friendly
    'user16@kook.com': [10, 18],          // Karen (celiac): Gluten-Free → High Fiber

    // New users with single plans
    'user17@kook.com': [15],              // Kevin: Asian Fusion
    'user18@kook.com': [6],               // Betty: Mediterranean
    'user19@kook.com': [15],              // Steven (sushi chef): Asian Fusion
    'user20@kook.com': [7],               // Lisa: Vegan
};

/**
 * Main seed function
 */
async function seedMealPlans() {
    console.log('🗓️  Starting meal plan seeding...\n');

    try {
        // Check if meal plans already exist
        const existingPlans = await prisma.mealPlanMeta.count();
        if (existingPlans > 0) {
            console.log(`⚠️  Database already has ${existingPlans} meal plans. Skipping seed.`);
            console.log('To re-seed, please clear the MealPlanMeta table first.\n');
            return;
        }

        // Check if recipes exist
        const recipeCount = await prisma.recipe.count();
        if (recipeCount === 0) {
            console.log('❌ No recipes found. Please seed recipes first.');
            console.log('Run: npm run seed:posts\n');
            return;
        }

        console.log(`✅ Found ${recipeCount} recipes in database\n`);
        console.log('📝 Creating meal plans...\n');

        let totalPlans = 0;
        let activePlans = 0;
        let archivedPlans = 0;

        for (const [email, templateIndices] of Object.entries(userMealPlanAssignments)) {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                console.log(`⚠️  User ${email} not found, skipping...`);
                continue;
            }

            for (let i = 0; i < templateIndices.length; i++) {
                const templateIndex = templateIndices[i];
                const template = mealPlanTemplates[templateIndex];

                // First plan is current week (active), others are from previous weeks (may be inactive)
                const weekOffset = i === 0 ? 0 : -(i * 2); // -2, -4, -6 weeks ago

                const { meta, detail } = await createMealPlan(user.id, template, weekOffset);

                totalPlans++;
                if (meta.is_active) {
                    activePlans++;
                } else {
                    archivedPlans++;
                }

                const weekStartStr = meta.day_start.toISOString().split('T')[0];
                const status = meta.is_active ? '🟢' : '🔴';
                console.log(`  ${status} "${template.goal}" for ${user.name} (Week: ${weekStartStr})`);
            }
        }

        console.log('\n✅ Meal plan seeding completed!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📊 Total Meal Plans: ${totalPlans}`);
        console.log(`   Active Plans: ${activePlans} 🟢`);
        console.log(`   Archived Plans: ${archivedPlans} 🔴`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Verify data consistency
        await verifyMealPlanData();

    } catch (error) {
        console.error('❌ Error seeding meal plans:', error);
        throw error;
    }
}

/**
 * Verify data consistency between PostgreSQL and MongoDB
 */
async function verifyMealPlanData() {
    console.log('🔍 Verifying meal plan data consistency...\n');

    try {
        const postgresCount = await prisma.mealPlanMeta.count();
        const mongoCount = await MealPlan.countDocuments();

        console.log('📊 Database State:');
        console.log(`   PostgreSQL (MealPlanMeta): ${postgresCount}`);
        console.log(`   MongoDB (MealPlan): ${mongoCount}\n`);

        if (postgresCount === mongoCount) {
            console.log('✅ Data is consistent!\n');

            // Sample check - verify a few random plans
            const samplePlans = await prisma.mealPlanMeta.findMany({ take: 3 });

            for (const plan of samplePlans) {
                const mongoDetail = await MealPlan.findOne({ plan_id: plan.id });
                if (mongoDetail) {
                    const totalMeals = Object.values(mongoDetail.meals).reduce((sum, day) => sum + day.length, 0);
                    console.log(`   ✓ Plan ${plan.id.substring(0, 8)}... has ${totalMeals} meals`);
                }
            }
            console.log('');

        } else {
            console.log('⚠️  Warning: Data inconsistency detected!');
            console.log(`   Difference: ${Math.abs(postgresCount - mongoCount)} plans\n`);
        }

    } catch (error) {
        console.error('Error verifying data:', error);
    }
}

/**
 * Main function
 */
async function main() {
    try {
        // Connect to MongoDB
        if (mongoose.connection.readyState === 0) {
            console.log('🔌 Connecting to MongoDB...');
            console.log('   URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/kook_db');

            await connectMongo();

            if (mongoose.connection.readyState !== 1) {
                throw new Error('MongoDB connection failed');
            }

            console.log('✅ MongoDB connected successfully\n');
        }

        await seedMealPlans();

    } catch (error) {
        console.error('❌ Fatal error:', error);
        throw error;
    }
}

// Only run main if executed directly
if (require.main === module) {
    main()
        .catch((error) => {
            console.error('❌ Fatal error:', error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
            if (mongoose.connection.readyState !== 0) {
                await mongoose.disconnect();
                console.log('👋 MongoDB disconnected.');
            }
            console.log('👋 Prisma disconnected.');
        });
}

module.exports = { seedMealPlans };
