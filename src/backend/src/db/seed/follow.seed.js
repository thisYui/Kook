const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Follow Seed Data
 * Creates follow relationships between users
 * Ensures realistic social network with various follow patterns
 */

/**
 * Generate follow relationships
 * Pattern:
 * - Admin (user1) follows some popular users
 * - Popular users (user2-user6) have many followers
 * - Moderator (user5) follows many users
 * - Regular users follow each other with realistic patterns
 * - Some users follow back (mutual follows)
 * - Some users are more popular than others
 */
async function generateFollowRelationships() {
    // Get all users ordered by email
    const users = await prisma.user.findMany({
        where: {
            is_deleted: false,
            is_disabled: false
        },
        select: {
            id: true,
            email: true,
            name: true
        },
        orderBy: { email: 'asc' }
    });

    if (users.length < 2) {
        console.log('⚠ Need at least 2 users to create follow relationships.');
        return [];
    }

    console.log(`Found ${users.length} users for follow relationships`);

    const follows = [];
    const followSet = new Set(); // Track unique follows

    // Helper function to add follow if valid and not duplicate
    const addFollow = (followerIdx, followeeIdx) => {
        // Validate indices
        if (followerIdx < 0 || followerIdx >= users.length) {
            console.warn(`⚠ Invalid follower index: ${followerIdx}`);
            return;
        }
        if (followeeIdx < 0 || followeeIdx >= users.length) {
            console.warn(`⚠ Invalid followee index: ${followeeIdx}`);
            return;
        }

        // Can't follow yourself
        if (followerIdx === followeeIdx) {
            return;
        }

        const followerId = users[followerIdx].id;
        const followeeId = users[followeeIdx].id;

        // Validate IDs exist
        if (!followerId || !followeeId) {
            console.warn(`⚠ Missing ID - Follower: ${followerId}, Followee: ${followeeId}`);
            return;
        }

        // Check for duplicates
        const key = `${followerId}:${followeeId}`;
        if (followSet.has(key)) {
            return;
        }

        followSet.add(key);
        follows.push({
            follower_id: followerId,
            followee_id: followeeId,
            follower_email: users[followerIdx].email,
            followee_email: users[followeeIdx].email
        });
    };

    // 1. Admin (user1 - index 0) follows popular chefs and moderator
    [1, 2, 3, 4, 5, 6, 10, 13].forEach(idx => addFollow(0, idx));

    // 2. Emily Johnson (user2 - index 1) - Popular French chef, many followers
    [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach(idx => addFollow(idx, 1));
    // Emily follows back some
    [3, 5, 6, 10, 13, 18].forEach(idx => addFollow(1, idx));

    // 3. Michael Chen (user3 - index 2) - Asian fusion blogger
    [0, 1, 4, 5, 7, 8, 9, 11, 13, 14, 15, 17, 18, 19].forEach(idx => addFollow(idx, 2));
    [1, 7, 8, 13, 18].forEach(idx => addFollow(2, idx));

    // 4. Sarah Williams (user4 - index 3) - Vegan cooking
    [0, 1, 2, 5, 6, 9, 10, 12, 14, 15, 16, 17].forEach(idx => addFollow(idx, 3));
    [1, 9, 10, 15].forEach(idx => addFollow(3, idx));

    // 5. David Martinez (user5 - index 4) - BBQ Master & Moderator (follows many)
    [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach(idx => addFollow(4, idx));
    [0, 1, 2, 6, 8, 9, 11, 13, 16, 17, 18].forEach(idx => addFollow(idx, 4));

    // 6. Jessica Lee (user6 - index 5) - Pastry chef
    [0, 1, 2, 3, 4, 7, 9, 10, 11, 12, 14, 15, 17].forEach(idx => addFollow(idx, 5));
    [1, 2, 11, 17].forEach(idx => addFollow(5, idx));

    // 7. James Wilson (user7 - index 6) - Home cook
    [1, 2, 3, 4, 5, 9, 10].forEach(idx => addFollow(6, idx));
    [2, 4, 5, 8, 10, 13].forEach(idx => addFollow(idx, 6));

    // 8. Maria Garcia (user8 - index 7) - Mexican food
    [1, 2, 4, 5, 6, 13, 14, 17, 18].forEach(idx => addFollow(7, idx));
    [2, 4, 13, 14, 16, 17].forEach(idx => addFollow(idx, 7));

    // 9. Robert Brown (user9 - index 8) - Seafood specialist
    [1, 2, 3, 4, 5, 10, 13, 18].forEach(idx => addFollow(8, idx));
    [1, 2, 3, 4, 18, 19].forEach(idx => addFollow(idx, 8));

    // 10. Linda Taylor (user10 - index 9) - Healthy meal prep
    [1, 2, 3, 4, 5, 6, 8, 9, 13, 15].forEach(idx => addFollow(9, idx));
    [1, 3, 4, 5, 15, 16].forEach(idx => addFollow(idx, 9));

    // 11. Christopher Davis (user11 - index 10) - Pizza & Italian
    [1, 2, 4, 5, 6, 17, 18].forEach(idx => addFollow(10, idx));
    [1, 2, 4, 5, 17, 18].forEach(idx => addFollow(idx, 10));

    // 12. Patricia Anderson (user12 - index 11) - Bread baker
    [1, 2, 3, 5, 6, 10, 15].forEach(idx => addFollow(11, idx));
    [1, 5, 6, 15].forEach(idx => addFollow(idx, 11));

    // 13. Daniel Thomas (user13 - index 12) - Street food
    [1, 2, 4, 5, 7, 8, 10, 17, 18].forEach(idx => addFollow(12, idx));
    [0, 1, 2, 4, 7, 8, 17].forEach(idx => addFollow(idx, 12));

    // 14. Nancy Jackson (user14 - index 13) - Vietnamese
    [1, 2, 3, 4, 5, 7, 12, 19].forEach(idx => addFollow(13, idx));
    [0, 1, 2, 7, 19].forEach(idx => addFollow(idx, 13));

    // 15. Matthew White (user15 - index 14) - Coffee & brunch
    [1, 2, 3, 5, 6, 9, 11].forEach(idx => addFollow(14, idx));
    [1, 3, 9, 11].forEach(idx => addFollow(idx, 14));

    // 16. Karen Harris (user16 - index 15) - Gluten-free
    [1, 2, 3, 4, 5, 9, 10].forEach(idx => addFollow(15, idx));
    [3, 4, 9].forEach(idx => addFollow(idx, 15));

    // 17. Kevin Martin (user17 - index 16) - Spice lover
    [1, 2, 4, 5, 7, 12, 13].forEach(idx => addFollow(16, idx));
    [1, 2, 4, 5, 7, 12].forEach(idx => addFollow(idx, 16));

    // 18. Betty Thompson (user18 - index 17) - Comfort food
    [1, 2, 3, 5, 6, 8, 10, 11, 12].forEach(idx => addFollow(17, idx));
    [1, 2, 5, 6, 8, 10, 12].forEach(idx => addFollow(idx, 17));

    // 19. Steven Garcia (user19 - index 18) - Sushi chef
    [1, 2, 4, 5, 8, 10, 13].forEach(idx => addFollow(18, idx));
    [1, 2, 4, 8, 10, 13].forEach(idx => addFollow(idx, 18));

    // 20. Lisa Martinez (user20 - index 19) - Smoothie bowls
    [1, 2, 3, 4, 5, 9, 13, 14].forEach(idx => addFollow(19, idx));
    [1, 3, 9, 13].forEach(idx => addFollow(idx, 19));

    console.log(`Generated ${follows.length} follow relationships`);
    return follows;
}

/**
 * Seed follows
 */
async function seedFollows() {
    console.log('Starting follow relationships seeding...');

    try {
        // Check if follows already exist
        const existingFollows = await prisma.follow.count();
        if (existingFollows > 0) {
            console.log(`⚠ Database already has ${existingFollows} follow relationships. Skipping seed.`);
            console.log('To re-seed, please clear the Follow table first.');
            return;
        }

        // Generate follow relationships
        const follows = await generateFollowRelationships();

        if (follows.length === 0) {
            console.log('⚠ No follow relationships to create.');
            return;
        }

        // Validate all follows before inserting
        console.log('Validating follow relationships...');
        const validFollows = [];
        const invalidFollows = [];

        for (const follow of follows) {
            // Check both users exist
            const [followerExists, followeeExists] = await Promise.all([
                prisma.user.findUnique({ where: { id: follow.follower_id } }),
                prisma.user.findUnique({ where: { id: follow.followee_id } })
            ]);

            if (!followerExists) {
                invalidFollows.push({ ...follow, reason: 'Follower not found' });
                continue;
            }

            if (!followeeExists) {
                invalidFollows.push({ ...follow, reason: 'Followee not found' });
                continue;
            }

            if (!follow.follower_id || !follow.followee_id) {
                invalidFollows.push({ ...follow, reason: 'Missing ID' });
                continue;
            }

            validFollows.push(follow);
        }

        if (invalidFollows.length > 0) {
            console.log(`⚠ Found ${invalidFollows.length} invalid follow relationships (will be skipped)`);
            invalidFollows.slice(0, 5).forEach(f => {
                console.log(`  - ${f.follower_email || 'unknown'} -> ${f.followee_email || 'unknown'}: ${f.reason}`);
            });
            if (invalidFollows.length > 5) {
                console.log(`  ... and ${invalidFollows.length - 5} more`);
            }
        }

        // Create valid follows
        let created = 0;
        let failed = 0;

        for (const follow of validFollows) {
            try {
                const { follower_email, followee_email, ...followData } = follow;

                await prisma.follow.create({
                    data: {
                        follower_id: followData.follower_id,
                        followee_id: followData.followee_id
                    }
                });
                created++;

                if (created % 10 === 0) {
                    console.log(`Created ${created}/${validFollows.length} follow relationships...`);
                }
            } catch (error) {
                failed++;
                console.error(`Failed to create follow: ${follow.follower_email} -> ${follow.followee_email}`);
                console.error(`Error: ${error.message}`);
            }
        }

        console.log(`\n✅ Successfully created ${created} follow relationships!`);
        if (failed > 0) {
            console.log(`⚠ Failed to create ${failed} follow relationships`);
        }

        // Count followers for each user
        const userStats = await prisma.user.findMany({
            select: {
                email: true,
                name: true,
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                }
            },
            orderBy: {
                email: 'asc'
            }
        });

        console.log('\nUser Follow Statistics:');
        console.log('─────────────────────────────────────────────────────────────');
        userStats.forEach(user => {
            console.log(`${user.email.padEnd(25)} | Followers: ${String(user._count.followers).padStart(3)} | Following: ${String(user._count.following).padStart(3)}`);
        });
        console.log('─────────────────────────────────────────────────────────────');

        // Top followers
        const topFollowers = userStats
            .sort((a, b) => b._count.followers - a._count.followers)
            .slice(0, 5);

        console.log('\nTop 5 Most Followed Users:');
        topFollowers.forEach((user, idx) => {
            console.log(`   ${idx + 1}. ${user.name} (${user.email}) - ${user._count.followers} followers`);
        });

        // Update count_followers for all users
        console.log('\nUpdating follower counts in user table...');
        for (const user of userStats) {
            await prisma.user.update({
                where: { email: user.email },
                data: { count_followers: user._count.followers }
            });
        }
        console.log('✅ Follower counts updated!');

    } catch (error) {
        console.error('❌ Error seeding follows:', error);
        throw error;
    }
}

// Export for use in master seed
module.exports = { seedFollows };

// Allow running directly
if (require.main === module) {
    seedFollows()
        .then(() => {
            console.log('✅ Follow seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Follow seeding failed:', error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
