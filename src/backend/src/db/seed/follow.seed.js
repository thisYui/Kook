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
    // Get all users
    const users = await prisma.user.findMany({
        orderBy: { email: 'asc' }
    });

    if (users.length < 2) {
        console.log('Need at least 2 users to create follow relationships.');
        return [];
    }

    const follows = [];
    const userIds = users.map(u => u.id);
    const userEmails = users.map(u => u.email);

    // Helper function to add follow if not exists
    const addFollow = (followerIdx, followeeIdx) => {
        if (followerIdx !== followeeIdx) {
            const key = `${followerIdx}-${followeeIdx}`;
            if (!follows.find(f => f.follower_id === userIds[followerIdx] && f.followee_id === userIds[followeeIdx])) {
                follows.push({
                    follower_id: userIds[followerIdx],
                    followee_id: userIds[followeeIdx],
                    follower_email: userEmails[followerIdx],
                    followee_email: userEmails[followeeIdx]
                });
            }
        }
    };

    // 1. Admin (user1 - index 0) follows popular chefs and moderator
    [1, 2, 3, 4, 5, 6, 10, 13].forEach(idx => {
        if (idx < users.length) addFollow(0, idx);
    });

    // 2. Emily Johnson (user2 - index 1) - Popular French chef, many followers
    [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach(idx => {
        if (idx < users.length) addFollow(idx, 1);
    });
    // Emily follows back some
    [3, 5, 6, 10, 13, 18].forEach(idx => {
        if (idx < users.length) addFollow(1, idx);
    });

    // 3. Michael Chen (user3 - index 2) - Asian fusion blogger
    [0, 1, 4, 5, 7, 8, 9, 11, 13, 14, 15, 17, 18, 19].forEach(idx => {
        if (idx < users.length) addFollow(idx, 2);
    });
    [1, 7, 8, 13, 18].forEach(idx => {
        if (idx < users.length) addFollow(2, idx);
    });

    // 4. Sarah Williams (user4 - index 3) - Vegan cooking
    [0, 1, 2, 5, 6, 9, 10, 12, 14, 15, 16, 17].forEach(idx => {
        if (idx < users.length) addFollow(idx, 3);
    });
    [1, 9, 10, 15].forEach(idx => {
        if (idx < users.length) addFollow(3, idx);
    });

    // 5. David Martinez (user5 - index 4) - BBQ Master & Moderator (follows many)
    [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach(idx => {
        if (idx < users.length) addFollow(4, idx);
    });
    [0, 1, 2, 6, 8, 9, 11, 13, 16, 17, 18].forEach(idx => {
        if (idx < users.length) addFollow(idx, 4);
    });

    // 6. Jessica Lee (user6 - index 5) - Pastry chef
    [0, 1, 2, 3, 4, 7, 9, 10, 11, 12, 14, 15, 17].forEach(idx => {
        if (idx < users.length) addFollow(idx, 5);
    });
    [1, 2, 11, 17].forEach(idx => {
        if (idx < users.length) addFollow(5, idx);
    });

    // 7. James Wilson (user7 - index 6) - Home cook
    [1, 2, 3, 4, 5, 9, 10].forEach(idx => {
        if (idx < users.length) addFollow(6, idx);
    });
    [2, 4, 5, 8, 10, 13].forEach(idx => {
        if (idx < users.length) addFollow(idx, 6);
    });

    // 8. Maria Garcia (user8 - index 7) - Mexican food
    [1, 2, 4, 5, 6, 13, 14, 17, 18].forEach(idx => {
        if (idx < users.length) addFollow(7, idx);
    });
    [2, 4, 13, 14, 16, 17].forEach(idx => {
        if (idx < users.length) addFollow(idx, 7);
    });

    // 9. Robert Brown (user9 - index 8) - Seafood specialist
    [1, 2, 3, 4, 5, 10, 13, 18].forEach(idx => {
        if (idx < users.length) addFollow(8, idx);
    });
    [1, 2, 3, 4, 18, 19].forEach(idx => {
        if (idx < users.length) addFollow(idx, 8);
    });

    // 10. Linda Taylor (user10 - index 9) - Healthy meal prep
    [1, 2, 3, 4, 5, 6, 8, 9, 13, 15].forEach(idx => {
        if (idx < users.length) addFollow(9, idx);
    });
    [1, 3, 4, 5, 15, 16].forEach(idx => {
        if (idx < users.length) addFollow(idx, 9);
    });

    // 11. Christopher Davis (user11 - index 10) - Pizza & Italian
    [1, 2, 4, 5, 6, 17, 18].forEach(idx => {
        if (idx < users.length) addFollow(10, idx);
    });
    [1, 2, 4, 5, 17, 18].forEach(idx => {
        if (idx < users.length) addFollow(idx, 10);
    });

    // 12. Patricia Anderson (user12 - index 11) - Bread baker
    [1, 2, 3, 5, 6, 10, 15].forEach(idx => {
        if (idx < users.length) addFollow(11, idx);
    });
    [1, 5, 6, 15].forEach(idx => {
        if (idx < users.length) addFollow(idx, 11);
    });

    // 13. Daniel Thomas (user13 - index 12) - Street food
    [1, 2, 4, 5, 7, 8, 10, 17, 18].forEach(idx => {
        if (idx < users.length) addFollow(12, idx);
    });
    [0, 1, 2, 4, 7, 8, 17].forEach(idx => {
        if (idx < users.length) addFollow(idx, 12);
    });

    // 14. Nancy Jackson (user14 - index 13) - Vietnamese
    [1, 2, 3, 4, 5, 7, 12, 19].forEach(idx => {
        if (idx < users.length) addFollow(13, idx);
    });
    [0, 1, 2, 7, 19].forEach(idx => {
        if (idx < users.length) addFollow(idx, 13);
    });

    // 15. Matthew White (user15 - index 14) - Coffee & brunch
    [1, 2, 3, 5, 6, 9, 11].forEach(idx => {
        if (idx < users.length) addFollow(14, idx);
    });
    [1, 3, 9, 11].forEach(idx => {
        if (idx < users.length) addFollow(idx, 14);
    });

    // 16. Karen Harris (user16 - index 15) - Gluten-free
    [1, 2, 3, 4, 5, 9, 10].forEach(idx => {
        if (idx < users.length) addFollow(15, idx);
    });
    [3, 4, 9].forEach(idx => {
        if (idx < users.length) addFollow(idx, 15);
    });

    // 17. Kevin Martin (user17 - index 16) - Spice lover
    [1, 2, 4, 5, 7, 12, 13].forEach(idx => {
        if (idx < users.length) addFollow(16, idx);
    });
    [1, 2, 4, 5, 7, 12].forEach(idx => {
        if (idx < users.length) addFollow(idx, 16);
    });

    // 18. Betty Thompson (user18 - index 17) - Comfort food
    [1, 2, 3, 5, 6, 8, 10, 11, 12].forEach(idx => {
        if (idx < users.length) addFollow(17, idx);
    });
    [1, 2, 5, 6, 8, 10, 12].forEach(idx => {
        if (idx < users.length) addFollow(idx, 17);
    });

    // 19. Steven Garcia (user19 - index 18) - Sushi chef
    [1, 2, 4, 5, 8, 10, 13].forEach(idx => {
        if (idx < users.length) addFollow(18, idx);
    });
    [1, 2, 4, 8, 10, 13].forEach(idx => {
        if (idx < users.length) addFollow(idx, 18);
    });

    // 20. Lisa Martinez (user20 - index 19) - Smoothie bowls
    [1, 2, 3, 4, 5, 9, 13, 14].forEach(idx => {
        if (idx < users.length) addFollow(19, idx);
    });
    [1, 3, 9, 13].forEach(idx => {
        if (idx < users.length) addFollow(idx, 19);
    });

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

        // Create follows
        let created = 0;
        for (const follow of follows) {
            const { follower_email, followee_email, ...followData } = follow;
            await prisma.follow.create({
                data: followData
            });
            created++;
            if (created % 10 === 0) {
                console.log(`Created ${created}/${follows.length} follow relationships...`);
            }
        }

        console.log(`\n✅ Successfully created ${created} follow relationships!`);

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
        console.log('Follower counts updated!');

    } catch (error) {
        console.error('Error seeding follows:', error);
        throw error;
    }
}

/**
 * Main function
 */
async function main() {
    await seedFollows();
}

// Run if executed directly
if (require.main === module) {
    main()
        .catch((error) => {
            console.error('Fatal error:', error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
            console.log('\nDatabase connection closed.');
        });
}

module.exports = { seedFollows };

