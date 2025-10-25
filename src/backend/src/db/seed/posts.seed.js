const { PrismaClient } = require('@prisma/client');
const RecipeDetail = require('../../models/mongo/RecipeDetail');
const mongoose = require('mongoose');
const { recipeTemplates, simplePosts } = require('./post.templates');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectMongo = require('../../config/mongo');
const { seedIngredientCatalog } = require('../init/ingredient_catalog.init');

const prisma = new PrismaClient();

/**
 * User assignment for posts (distribute unevenly)
 * Only use templates 0-3 (4 available templates) and reuse across users
 * This will create 42 recipe posts total
 */
const userRecipeAssignments = {
    'user1@kook.com': [0, 1],        // Admin - 2 recipes
    'user2@kook.com': [0, 1, 2, 3],  // Emily - 4 recipes
    'user3@kook.com': [0, 1, 2],     // Michael - 3 recipes
    'user4@kook.com': [1, 2, 3],     // Sarah - 3 recipes
    'user5@kook.com': [0, 3],        // David - 2 recipes
    'user6@kook.com': [1, 2],        // Jessica - 2 recipes
    'user7@kook.com': [0, 1],        // James - 2 recipes
    'user8@kook.com': [2, 3],        // Maria - 2 recipes
    'user9@kook.com': [0, 2],        // Robert - 2 recipes
    'user10@kook.com': [1, 3],       // Linda - 2 recipes
    'user11@kook.com': [0, 3],       // Christopher - 2 recipes
    'user12@kook.com': [1, 2],       // Patricia - 2 recipes
    'user13@kook.com': [0, 2],       // Daniel - 2 recipes
    'user14@kook.com': [1, 3],       // Nancy - 2 recipes
    'user15@kook.com': [0, 1],       // Matthew - 2 recipes
    'user16@kook.com': [2, 3],       // Karen - 2 recipes
    'user17@kook.com': [0, 2],       // Kevin - 2 recipes
    'user18@kook.com': [1, 3],       // Betty - 2 recipes
    'user19@kook.com': [0, 1],       // Steven - 2 recipes
    'user20@kook.com': [2, 3],       // Lisa - 2 recipes
};

const userSimplePostCounts = {
    'user1@kook.com': 0,
    'user2@kook.com': 1,
    'user3@kook.com': 1,
    'user4@kook.com': 1,
    'user5@kook.com': 1,
    'user6@kook.com': 1,
    'user7@kook.com': 1,
    'user8@kook.com': 1,
    'user9@kook.com': 1,
    'user10@kook.com': 1,
    'user11@kook.com': 1,
    'user12@kook.com': 1,
    'user13@kook.com': 1,
    'user14@kook.com': 0,
    'user15@kook.com': 0,
    'user16@kook.com': 0,
    'user17@kook.com': 0,
    'user18@kook.com': 0,
    'user19@kook.com': 0,
    'user20@kook.com': 0,
};

/**
 * Ensure tag exists
 */
async function ensureTag(tagName) {
    const slug = tagName.toLowerCase().replace(/\s+/g, '-');
    let tag = await prisma.tag.findUnique({ where: { slug } });

    if (!tag) {
        tag = await prisma.tag.create({
            data: { name: tagName, slug, usage_count: 0, is_active: true }
        });
    }

    return tag;
}

/**
 * Create recipe post
 */
async function createRecipePost(userId, template) {
    const post = await prisma.post.create({
        data: {
            author_id: userId,
            title: template.title,
            short_description: template.short_description,
            image_url: template.image_url,
            view_count: Math.floor(Math.random() * 500),
            is_published: true
        }
    });

    const recipe = await prisma.recipe.create({
        data: {
            post_id: post.id,
            total_minute: template.total_minute,
            cook_minute: template.cook_minute,
            difficulty: template.difficulty,
            total_steps: template.steps.length,
            calories: template.calories,
            current_version: 1
        }
    });

    // Create ingredients
    for (let i = 0; i < template.ingredients.length; i++) {
        const ing = template.ingredients[i];
        await prisma.ingredient.create({
            data: {
                post_id: post.id,
                ingredient_key: ing.ingredient_key,
                quantity: ing.quantity,
                unit: ing.unit,
                is_optional: false,
                display_order: i + 1
            }
        });
    }

    // Create MongoDB recipe details
    const recipeDetail = new RecipeDetail({
        recipe_id: recipe.id,
        post_id: post.id,
        steps: template.steps,
        version: 1
    });
    await recipeDetail.save();

    await prisma.recipeVersionMap.create({
        data: {
            recipe_id: recipe.id,
            mongo_version: 1,
            is_synced: true,
            synced_at: new Date()
        }
    });

    // Create tags
    for (const tagName of template.tags) {
        const tag = await ensureTag(tagName);
        await prisma.postTag.create({
            data: { post_id: post.id, tag_id: tag.id }
        });
        await prisma.tag.update({
            where: { id: tag.id },
            data: { usage_count: { increment: 1 } }
        });
    }

    return { post, recipe };
}

/**
 * Create simple post
 */
async function createSimplePost(userId, template) {
    const post = await prisma.post.create({
        data: {
            author_id: userId,
            title: template.title,
            short_description: template.short_description,
            image_url: template.image_url,
            view_count: Math.floor(Math.random() * 300),
            is_published: true
        }
    });

    for (const tagName of template.tags) {
        const tag = await ensureTag(tagName);
        await prisma.postTag.create({
            data: { post_id: post.id, tag_id: tag.id }
        });
        await prisma.tag.update({
            where: { id: tag.id },
            data: { usage_count: { increment: 1 } }
        });
    }

    return post;
}

/**
 * Generate default cooking steps based on recipe
 */
function generateDefaultSteps(stepCount) {
    const defaultSteps = [
        {
            order: 1,
            title: 'Prepare ingredients',
            description: 'Gather and prepare all ingredients. Wash vegetables, measure out quantities, and organize your workspace.',
            duration: 10,
            has_timer: false,
            media: [],
            tips: ['Read through the entire recipe first', 'Mise en place - have everything ready']
        },
        {
            order: 2,
            title: 'Cook main ingredients',
            description: 'Follow the cooking method for your main ingredients. Pay attention to heat levels and cooking times.',
            duration: 20,
            has_timer: true,
            media: [],
            tips: ['Don\'t rush the cooking process', 'Taste and adjust seasoning as you go']
        },
        {
            order: 3,
            title: 'Combine and finish',
            description: 'Combine all components together. Add final seasonings and garnishes.',
            duration: 10,
            has_timer: false,
            media: [],
            tips: ['Season to taste before serving', 'Let dish rest if needed']
        },
        {
            order: 4,
            title: 'Plate and serve',
            description: 'Plate the dish attractively and serve while hot.',
            duration: 5,
            has_timer: false,
            media: [],
            tips: ['Garnish for presentation', 'Serve immediately for best results']
        }
    ];

    const numSteps = Math.max(2, Math.min(stepCount, 4));
    return defaultSteps.slice(0, numSteps);
}

/**
 * Check and fix missing recipe data
 * Ensures every post has corresponding recipe and recipe details
 * Also removes posts without recipes (orphaned posts)
 */
async function checkAndFixMissingData() {
    console.log('🔍 Verifying data consistency...\n');

    const postCount = await prisma.post.count();
    const recipeCount = await prisma.recipe.count();
    const recipeDetailCount = await RecipeDetail.countDocuments();
    const versionMapCount = await prisma.recipeVersionMap.count();

    console.log('📊 Database State:');
    console.log(`   Posts: ${postCount}`);
    console.log(`   Recipes (PostgreSQL): ${recipeCount}`);
    console.log(`   Recipe Details (MongoDB): ${recipeDetailCount}`);
    console.log(`   Recipe Version Maps: ${versionMapCount}\n`);

    // Get all posts with their recipes
    const allPosts = await prisma.post.findMany({
        include: {
            recipe: {
                include: {
                    version_maps: true
                }
            },
            ingredients: true
        }
    });

    let fixedRecipes = 0;
    let fixedDetails = 0;
    let fixedVersionMaps = 0;
    let deletedPosts = 0;

    // First pass: Delete posts without recipes and without ingredients (orphaned posts)
    console.log('🗑️  Checking for orphaned posts (no recipe, no ingredients)...\n');

    for (const post of allPosts) {
        if (!post.recipe && post.ingredients.length === 0) {
            console.log(`🗑️  Deleting orphaned post: "${post.title.substring(0, 50)}..."`);

            // Delete related data first
            await prisma.postTag.deleteMany({ where: { post_id: post.id } });
            await prisma.post.delete({ where: { id: post.id } });

            deletedPosts++;
            console.log(`   ✅ Deleted\n`);
        }
    }

    if (deletedPosts > 0) {
        console.log(`✅ Deleted ${deletedPosts} orphaned posts\n`);
    }

    // Refresh posts list after deletion
    const remainingPosts = await prisma.post.findMany({
        include: {
            recipe: {
                include: {
                    version_maps: true
                }
            },
            ingredients: true
        }
    });

    // Second pass: Fix or delete posts with ingredients but no recipe
    console.log('🔧 Checking for posts with ingredients but no recipe...\n');

    for (const post of remainingPosts) {
        // Fix missing recipe (if post has ingredients)
        if (!post.recipe && post.ingredients.length > 0) {
            console.log(`🔧 Creating missing Recipe for: "${post.title.substring(0, 50)}..."`);

            const recipe = await prisma.recipe.create({
                data: {
                    post_id: post.id,
                    total_minute: 45,
                    cook_minute: 30,
                    difficulty: 'MEDIUM',
                    total_steps: 3,
                    calories: 350,
                    current_version: 1
                }
            });

            // Create recipe detail
            const steps = generateDefaultSteps(3);
            const recipeDetail = new RecipeDetail({
                recipe_id: recipe.id,
                post_id: post.id,
                steps: steps,
                version: 1
            });
            await recipeDetail.save();

            await prisma.recipeVersionMap.create({
                data: {
                    recipe_id: recipe.id,
                    mongo_version: 1,
                    is_synced: true,
                    synced_at: new Date()
                }
            });

            fixedRecipes++;
            fixedDetails++;
            fixedVersionMaps++;
            console.log(`   ✅ Created Recipe, RecipeDetail, and VersionMap\n`);
            continue;
        }

        // Fix missing recipe details (if recipe exists but no MongoDB details)
        if (post.recipe) {
            const existingDetail = await RecipeDetail.findOne({ recipe_id: post.recipe.id });

            if (!existingDetail) {
                console.log(`🔧 Creating missing RecipeDetail for: "${post.title.substring(0, 50)}..."`);

                const steps = generateDefaultSteps(post.recipe.total_steps || 3);
                const recipeDetail = new RecipeDetail({
                    recipe_id: post.recipe.id,
                    post_id: post.id,
                    steps: steps,
                    version: 1
                });
                await recipeDetail.save();

                fixedDetails++;
                console.log(`   ✅ Created RecipeDetail with ${steps.length} steps`);
            }

            // Fix missing version map (if recipe exists but no version map)
            const versionMap = await prisma.recipeVersionMap.findFirst({
                where: { recipe_id: post.recipe.id }
            });

            if (!versionMap) {
                console.log(`🔧 Creating missing RecipeVersionMap for: "${post.title.substring(0, 50)}..."`);

                await prisma.recipeVersionMap.create({
                    data: {
                        recipe_id: post.recipe.id,
                        mongo_version: 1,
                        is_synced: true,
                        synced_at: new Date()
                    }
                });

                fixedVersionMaps++;
                console.log(`   ✅ Created RecipeVersionMap\n`);
            }
        }
    }

    // Final count
    const newPostCount = await prisma.post.count();
    const newRecipeCount = await prisma.recipe.count();
    const newRecipeDetailCount = await RecipeDetail.countDocuments();
    const newVersionMapCount = await prisma.recipeVersionMap.count();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Final Database State:');
    console.log(`   Posts: ${newPostCount}`);
    console.log(`   Recipes: ${newRecipeCount}`);
    console.log(`   Recipe Details: ${newRecipeDetailCount}`);
    console.log(`   Recipe Version Maps: ${newVersionMapCount}`);
    console.log(`\n🔧 Actions Taken:`);
    console.log(`   Deleted orphaned posts: ${deletedPosts}`);
    console.log(`   Created recipes: ${fixedRecipes}`);
    console.log(`   Created recipe details: ${fixedDetails}`);
    console.log(`   Created version maps: ${fixedVersionMaps}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (newRecipeCount === newRecipeDetailCount && newRecipeCount === newVersionMapCount && newPostCount === newRecipeCount) {
        console.log('✅ All data is now consistent!\n');
        console.log(`   Every post has a recipe, recipe details, and version map.\n`);
    } else if (newRecipeCount === newRecipeDetailCount && newRecipeCount === newVersionMapCount) {
        console.log('✅ Recipes, Recipe Details, and Version Maps are consistent!\n');
        console.log(`⚠️  Note: ${newPostCount - newRecipeCount} posts are simple posts without recipes (this is normal)\n`);
    } else {
        console.log('⚠️  Some inconsistencies remain. Please check manually.\n');
    }
}

/**
 * Main seed function
 */
async function seedPosts() {
    console.log('🍳 Starting posts seeding...\n');

    try {
        const existingPosts = await prisma.post.count();
        if (existingPosts > 0) {
            console.log(`⚠ Database already has ${existingPosts} posts. Checking consistency...\n`);
            await checkAndFixMissingData();
            return;
        }

        // Seed ingredient catalog first if not exists
        const ingredientCount = await prisma.ingredientCatalog.count();
        if (ingredientCount === 0) {
            console.log('📦 Seeding ingredient catalog first...\n');
            await seedIngredientCatalog();
        } else {
            console.log(`✅ Ingredient catalog already exists (${ingredientCount} ingredients)\n`);
        }

        console.log('📝 Creating recipe posts...');
        let totalPosts = 0;
        let totalRecipes = 0;

        // Create recipe posts
        for (const [email, templateIndices] of Object.entries(userRecipeAssignments)) {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) continue;

            for (const idx of templateIndices) {
                if (idx < recipeTemplates.length) {
                    const template = recipeTemplates[idx];
                    await createRecipePost(user.id, template);
                    totalRecipes++;
                    totalPosts++;
                    console.log(`   ✅ Created recipe post for ${email}: "${template.title}"`);
                }
            }
        }

        console.log(`\n📝 Created ${totalRecipes} recipe posts\n`);

        // Create simple posts
        console.log('📝 Creating simple posts...');
        let totalSimplePosts = 0;

        for (const [email, count] of Object.entries(userSimplePostCounts)) {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || count === 0) continue;

            for (let i = 0; i < count; i++) {
                if (i < simplePosts.length) {
                    const template = simplePosts[i];
                    await createSimplePost(user.id, template);
                    totalSimplePosts++;
                    totalPosts++;
                    console.log(`   ✅ Created simple post for ${email}: "${template.title}"`);
                }
            }
        }

        console.log(`\n📝 Created ${totalSimplePosts} simple posts\n`);

        // Update user post counts
        console.log('📊 Updating user post counts...');
        const users = await prisma.user.findMany();
        for (const user of users) {
            const postCount = await prisma.post.count({
                where: { author_id: user.id }
            });
            await prisma.user.update({
                where: { id: user.id },
                data: { count_posts: postCount }
            });
        }

        console.log('✅ Post seeding completed successfully!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 Summary:');
        console.log(`   Total posts created: ${totalPosts}`);
        console.log(`   Recipe posts: ${totalRecipes}`);
        console.log(`   Simple posts: ${totalSimplePosts}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Verify data consistency
        await checkAndFixMissingData();

    } catch (error) {
        console.error('Error during seeding:', error);
        throw error;
    }
}

// Run if this file is executed directly
if (require.main === module) {
    (async () => {
        try {
            await connectMongo();
            await seedPosts();
        } catch (error) {
            console.error('Fatal error:', error);
            process.exit(1);
        } finally {
            await prisma.$disconnect();
            await mongoose.disconnect();
        }
    })();
}

module.exports = { seedPosts, checkAndFixMissingData };
