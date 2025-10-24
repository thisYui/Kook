const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * User Allergy Assignments
 * Mapping users to their allergic ingredients
 * Expanded with more realistic allergy combinations
 */
const userAllergyAssignments = {
    'user1@kook.com': [],  // Admin - no allergies
    'user2@kook.com': ['peanuts', 'peanut_butter'],  // Emily - severe peanut allergy
    'user3@kook.com': ['shellfish', 'shrimp', 'crab', 'lobster', 'oyster', 'clam', 'mussel', 'scallop'],  // Michael - all shellfish
    'user4@kook.com': [],  // Sarah - vegan, no allergies
    'user5@kook.com': ['soy', 'soybeans', 'tofu', 'soy_milk', 'soy_sauce'],  // David - soy allergy
    'user6@kook.com': ['wheat', 'wheat_flour', 'bread_flour', 'cake_flour', 'pasta', 'spaghetti', 'bread', 'white_bread', 'whole_wheat_bread'],  // Jessica - wheat/gluten intolerant
    'user7@kook.com': ['milk', 'condensed_milk', 'evaporated_milk', 'heavy_cream', 'sour_cream', 'yogurt', 'butter', 'cheese', 'cheddar_cheese', 'mozzarella_cheese', 'parmesan_cheese', 'cream_cheese'],  // James - severe lactose intolerant
    'user8@kook.com': ['sesame_seeds', 'sesame_oil', 'tahini'],  // Maria - sesame allergy
    'user9@kook.com': ['fish', 'salmon', 'tuna', 'mackerel', 'tilapia', 'catfish', 'cod', 'fish_sauce'],  // Robert - all fish
    'user10@kook.com': ['tree_nuts', 'almonds', 'walnuts', 'cashews', 'pistachios', 'macadamia', 'hazelnuts', 'pecans', 'pine_nuts', 'almond_extract'],  // Linda - all tree nuts
    'user11@kook.com': ['eggs', 'egg', 'duck_egg', 'quail_egg', 'mayonnaise'],  // Christopher - egg allergy
    'user12@kook.com': ['mustard', 'mustard_greens'],  // Patricia - mustard allergy
    'user13@kook.com': ['corn', 'cornstarch', 'canned_corn', 'frozen_corn'],  // Daniel - corn allergy
    'user14@kook.com': [],  // Nancy - no allergies
    'user15@kook.com': ['peanuts', 'peanut_butter', 'tree_nuts', 'almonds', 'walnuts', 'cashews'],  // Matthew - all nuts allergy
    'user16@kook.com': ['wheat', 'wheat_flour', 'bread_flour', 'barley', 'pasta', 'bread', 'soy_sauce'],  // Karen - celiac disease (all gluten sources)
    'user17@kook.com': [],  // Kevin - spice lover, no allergies
    'user18@kook.com': ['shellfish', 'shrimp', 'prawn', 'crab', 'squid', 'octopus'],  // Betty - shellfish & mollusks
    'user19@kook.com': [],  // Steven - sushi chef, no allergies
    'user20@kook.com': ['milk', 'butter', 'cheese', 'yogurt', 'ice_cream'],  // Lisa - dairy allergy
};

/**
 * Common allergens that should exist in IngredientCatalog
 * Expanded list covering all major allergens and their derivatives
 * Based on FDA's major food allergen list and common sensitivities
 */
const commonAllergens = [
    // === MILK & DAIRY (Sữa và chế phẩm từ sữa) ===
    'milk',
    'condensed_milk',
    'evaporated_milk',
    'heavy_cream',
    'sour_cream',
    'yogurt',
    'butter',
    'cheese',
    'cheddar_cheese',
    'mozzarella_cheese',
    'parmesan_cheese',
    'cream_cheese',
    'ice_cream',

    // === EGGS (Trứng) ===
    'egg',
    'eggs',
    'duck_egg',
    'quail_egg',
    'mayonnaise',

    // === FISH (Cá) ===
    'fish',
    'salmon',
    'tuna',
    'mackerel',
    'tilapia',
    'catfish',
    'cod',
    'fish_sauce',
    'canned_tuna',
    'canned_sardines',

    // === SHELLFISH (Hải sản có vỏ) ===
    'shellfish',
    'shrimp',
    'prawn',
    'crab',
    'lobster',
    'squid',
    'octopus',
    'clam',
    'mussel',
    'oyster',
    'scallop',
    'snail',
    'shrimp_paste',

    // === TREE NUTS (Hạt cây) ===
    'tree_nuts',
    'almonds',
    'walnuts',
    'cashews',
    'pistachios',
    'macadamia',
    'hazelnuts',
    'pecans',
    'pine_nuts',
    'almond_extract',

    // === PEANUTS (Đậu phộng) ===
    'peanuts',
    'peanut_butter',

    // === SOY (Đậu nành) ===
    'soy',
    'soybeans',
    'tofu',
    'soy_milk',
    'soy_sauce',

    // === WHEAT/GLUTEN (Lúa mì/Gluten) ===
    'wheat',
    'wheat_flour',
    'bread_flour',
    'cake_flour',
    'barley',
    'pasta',
    'spaghetti',
    'noodles',
    'bread',
    'white_bread',
    'whole_wheat_bread',
    'instant_noodles',

    // === SESAME (Mè) ===
    'sesame',
    'sesame_seeds',
    'sesame_oil',
    'tahini',

    // === MUSTARD (Mù tạt) ===
    'mustard',
    'mustard_greens',

    // === CORN (Ngô) ===
    'corn',
    'cornstarch',
    'canned_corn',
    'frozen_corn',

    // === SULFITES (Sunfit - chất bảo quản) ===
    'wine',
    'red_wine',
    'white_wine',

    // === OTHER COMMON ALLERGENS ===
    'coconut',
    'coconut_milk',
    'coconut_cream',
    'coconut_oil',
    'avocado',
    'kiwi',
    'banana',
    'strawberry',
    'tomato',
    'celery',
    'garlic',
    'onion',
];

/**
 * Seed user allergies
 */
async function seedUserAllergies() {
    console.log('🚨 Starting user allergies seeding...\n');

    try {
        // Check if allergies already exist
        const existingAllergies = await prisma.userAllergy.count();
        if (existingAllergies > 0) {
            console.log(`⚠️  Database already has ${existingAllergies} user allergies. Skipping seed.`);
            console.log('To re-seed, please clear the UserAllergy table first.\n');
            return;
        }

        // Check if users exist
        const userCount = await prisma.user.count();
        if (userCount === 0) {
            console.log('❌ No users found. Please seed users first.');
            console.log('Run: npm run seed:users\n');
            return;
        }

        // Check if ingredient catalog has required allergens
        const availableIngredients = await prisma.ingredientCatalog.findMany({
            where: {
                ingredient_key: { in: commonAllergens }
            },
            select: {
                ingredient_key: true,
                display_name: true
            }
        });

        if (availableIngredients.length === 0) {
            console.log('❌ No allergen ingredients found in catalog.');
            console.log('Please seed ingredient catalog first.');
            console.log('Run: npm run seed:ingredients\n');
            return;
        }

        console.log(`✅ Found ${availableIngredients.length} allergen ingredients in catalog\n`);
        console.log('📝 Creating user allergies...\n');

        const availableKeys = availableIngredients.map(i => i.ingredient_key);
        let totalAllergies = 0;
        let usersWithAllergies = 0;

        for (const [email, allergyKeys] of Object.entries(userAllergyAssignments)) {
            // Skip if user has no allergies
            if (allergyKeys.length === 0) {
                continue;
            }

            // Find user
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                console.log(`⚠️  User ${email} not found, skipping...`);
                continue;
            }

            // Filter only available allergens
            const validAllergyKeys = allergyKeys.filter(key => availableKeys.includes(key));

            if (validAllergyKeys.length === 0) {
                console.log(`⚠️  No valid allergens for ${user.name}, skipping...`);
                continue;
            }

            // Create allergies for this user
            for (const ingredientKey of validAllergyKeys) {
                await prisma.userAllergy.create({
                    data: {
                        user_id: user.id,
                        ingredient_key: ingredientKey,
                        is_active: true
                    }
                });

                totalAllergies++;
            }

            usersWithAllergies++;
            const allergenNames = validAllergyKeys.join(', ');
            console.log(`  🚨 ${user.name}: ${allergenNames}`);
        }

        console.log('\n✅ User allergies seeding completed!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📊 Total Allergies: ${totalAllergies}`);
        console.log(`   Users with allergies: ${usersWithAllergies}`);
        console.log(`   Users without allergies: ${Object.keys(userAllergyAssignments).length - usersWithAllergies}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Show summary by allergen
        await showAllergenSummary();

    } catch (error) {
        console.error('❌ Error seeding user allergies:', error);
        throw error;
    }
}

/**
 * Show summary of allergies by ingredient
 */
async function showAllergenSummary() {
    console.log('📊 Allergy Summary by Ingredient:\n');

    try {
        const allergyCounts = await prisma.userAllergy.groupBy({
            by: ['ingredient_key'],
            _count: {
                ingredient_key: true
            },
            orderBy: {
                _count: {
                    ingredient_key: 'desc'
                }
            }
        });

        // Get ingredient display names
        for (const item of allergyCounts.slice(0, 10)) {  // Top 10
            const ingredient = await prisma.ingredientCatalog.findUnique({
                where: { ingredient_key: item.ingredient_key },
                select: { display_name: true }
            });

            const displayName = ingredient?.display_name || item.ingredient_key;
            console.log(`   ${displayName}: ${item._count.ingredient_key} user(s)`);
        }

        console.log('');

    } catch (error) {
        console.error('Error showing allergen summary:', error);
    }
}

/**
 * Main function
 */
async function main() {
    try {
        await seedUserAllergies();
    } catch (error) {
        console.error('❌ Fatal error:', error);
        throw error;
    }
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
            console.log('👋 Database connection closed.');
        });
}

module.exports = { seedUserAllergies };
