/**
 * Recipe and Post Templates
 * Contains all recipe data and simple post templates
 */

const recipeTemplates = [
    // French Cuisine - Emily Johnson (user2)
    {
        title: 'Classic French Coq au Vin',
        short_description: 'Traditional French chicken braised in red wine with mushrooms, bacon, and pearl onions. A timeless classic that fills your kitchen with amazing aromas.',
        image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
        difficulty: 'MEDIUM',
        total_minute: 120,
        cook_minute: 90,
        calories: 485,
        ingredients: [
            { ingredient_key: 'chicken', quantity: 1.5, unit: 'KILOGRAM' },
            { ingredient_key: 'red_wine', quantity: 750, unit: 'MILLILITER' },
            { ingredient_key: 'bacon', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'mushroom', quantity: 300, unit: 'GRAM' },
            { ingredient_key: 'pearl_onion', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'garlic', quantity: 4, unit: 'CLOVE' },
            { ingredient_key: 'thyme', quantity: 3, unit: 'STALK' },
            { ingredient_key: 'bay_leaf', quantity: 2, unit: 'PIECE' },
            { ingredient_key: 'butter', quantity: 50, unit: 'GRAM' },
            { ingredient_key: 'flour', quantity: 30, unit: 'GRAM' },
        ],
        steps: [
            {
                order: 1,
                title: 'Prepare the ingredients',
                description: 'Cut chicken into 8 pieces, dice bacon, clean mushrooms, peel pearl onions and garlic.',
                duration: 15,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1606787620819-8bac31ab7c3f' }],
                tips: ['Use kitchen shears for easier chicken cutting', 'Save chicken bones for stock']
            },
            {
                order: 2,
                title: 'Brown the chicken',
                description: 'Season chicken with salt and pepper. Heat butter in a large Dutch oven over medium-high heat. Brown chicken pieces on all sides, about 3-4 minutes per side. Remove and set aside.',
                duration: 15,
                has_timer: true,
                media: [],
                tips: ['Don\'t overcrowd the pan', 'Dry chicken thoroughly before browning']
            },
            {
                order: 3,
                title: 'Cook bacon and vegetables',
                description: 'In the same pot, cook bacon until crispy. Add pearl onions and mushrooms, cook until golden. Add garlic and cook for 1 minute.',
                duration: 10,
                has_timer: false,
                media: [],
                tips: ['Reserve some bacon fat for flavor']
            },
            {
                order: 4,
                title: 'Deglaze and braise',
                description: 'Sprinkle flour over vegetables, stir for 1 minute. Pour in red wine, scraping up browned bits. Add thyme and bay leaves. Return chicken to pot, bring to simmer.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Use a good quality wine you would drink']
            },
            {
                order: 5,
                title: 'Slow cook',
                description: 'Cover and transfer to 350°F oven. Braise for 45-60 minutes until chicken is tender and sauce has thickened.',
                duration: 60,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90' }],
                tips: ['Check halfway through', 'Sauce should coat the back of a spoon']
            },
            {
                order: 6,
                title: 'Finish and serve',
                description: 'Remove from oven, discard bay leaves and thyme stems. Season with salt and pepper. Serve hot with crusty bread or mashed potatoes.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Garnish with fresh parsley', 'Let rest 5 minutes before serving']
            }
        ],
        tags: ['french', 'chicken', 'wine-braised', 'comfort-food', 'classic']
    },
    {
        title: 'Crème Brûlée - The Perfect French Dessert',
        short_description: 'Silky smooth vanilla custard topped with caramelized sugar. Master the art of this elegant French dessert.',
        image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
        difficulty: 'MEDIUM',
        total_minute: 240,
        cook_minute: 40,
        calories: 320,
        ingredients: [
            { ingredient_key: 'heavy_cream', quantity: 500, unit: 'MILLILITER' },
            { ingredient_key: 'egg_yolk', quantity: 6, unit: 'PIECE' },
            { ingredient_key: 'sugar', quantity: 100, unit: 'GRAM' },
            { ingredient_key: 'vanilla_bean', quantity: 1, unit: 'PIECE' },
            { ingredient_key: 'brown_sugar', quantity: 50, unit: 'GRAM' },
        ],
        steps: [
            {
                order: 1,
                title: 'Infuse cream with vanilla',
                description: 'Split vanilla bean, scrape seeds. Heat cream with vanilla pod and seeds until just simmering. Remove from heat, let steep 15 minutes.',
                duration: 20,
                has_timer: true,
                media: [],
                tips: ['Don\'t let cream boil', 'Save vanilla pod for vanilla sugar']
            },
            {
                order: 2,
                title: 'Prepare custard base',
                description: 'Whisk egg yolks and sugar until pale. Slowly pour warm cream while whisking constantly. Strain through fine sieve.',
                duration: 10,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b' }],
                tips: ['Temper eggs slowly to avoid scrambling', 'Strain for silky texture']
            },
            {
                order: 3,
                title: 'Bake in water bath',
                description: 'Pour custard into ramekins. Place in baking dish, fill with hot water halfway up sides. Bake at 325°F for 30-35 minutes until set but still jiggly.',
                duration: 35,
                has_timer: true,
                media: [],
                tips: ['Water bath ensures even cooking', 'Centers should wobble slightly']
            },
            {
                order: 4,
                title: 'Chill completely',
                description: 'Remove from water bath, cool to room temperature. Refrigerate at least 3 hours or overnight.',
                duration: 180,
                has_timer: true,
                media: [],
                tips: ['Cover with plastic wrap to prevent skin', 'Overnight chilling gives best texture']
            },
            {
                order: 5,
                title: 'Caramelize sugar topping',
                description: 'Sprinkle thin layer of brown sugar on each custard. Use kitchen torch to caramelize until golden and bubbling. Let set 2 minutes.',
                duration: 5,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814' }],
                tips: ['Keep torch moving', 'Serve within 1 hour for crispy top']
            }
        ],
        tags: ['french', 'dessert', 'custard', 'vanilla', 'elegant']
    },

    // Asian Fusion - Michael Chen (user3)
    {
        title: 'Spicy Korean-Style Fried Chicken Wings',
        short_description: 'Crispy double-fried chicken wings tossed in a sweet and spicy gochujang glaze. Addictively delicious!',
        image_url: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2',
        difficulty: 'MEDIUM',
        total_minute: 90,
        cook_minute: 30,
        calories: 425,
        ingredients: [
            { ingredient_key: 'chicken_wing', quantity: 1, unit: 'KILOGRAM' },
            { ingredient_key: 'potato_starch', quantity: 100, unit: 'GRAM' },
            { ingredient_key: 'gochujang', quantity: 60, unit: 'GRAM' },
            { ingredient_key: 'honey', quantity: 40, unit: 'GRAM' },
            { ingredient_key: 'soy_sauce', quantity: 30, unit: 'MILLILITER' },
            { ingredient_key: 'rice_vinegar', quantity: 20, unit: 'MILLILITER' },
            { ingredient_key: 'garlic', quantity: 4, unit: 'CLOVE' },
            { ingredient_key: 'ginger', quantity: 20, unit: 'GRAM' },
            { ingredient_key: 'sesame_seed', quantity: 10, unit: 'GRAM' },
            { ingredient_key: 'green_onion', quantity: 2, unit: 'STALK' },
        ],
        steps: [
            {
                order: 1,
                title: 'Prepare and dry chicken',
                description: 'Pat chicken wings completely dry with paper towels. Place on wire rack, refrigerate uncovered for 1 hour to dry skin.',
                duration: 65,
                has_timer: true,
                media: [],
                tips: ['Dry skin = crispy wings', 'Can prep night before']
            },
            {
                order: 2,
                title: 'First fry',
                description: 'Heat oil to 350°F. Coat wings with potato starch. Fry in batches for 8-10 minutes until cooked through but not brown. Drain on rack.',
                duration: 15,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92' }],
                tips: ['Don\'t overcrowd fryer', 'Maintain oil temperature']
            },
            {
                order: 3,
                title: 'Make the sauce',
                description: 'Mix gochujang, honey, soy sauce, rice vinegar, minced garlic, and grated ginger. Simmer in pan for 3-4 minutes until thickened.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Adjust spice level to taste', 'Sauce will thicken as it cools']
            },
            {
                order: 4,
                title: 'Second fry',
                description: 'Heat oil to 375°F. Fry wings again for 5-7 minutes until golden and extra crispy.',
                duration: 10,
                has_timer: true,
                media: [],
                tips: ['Higher temperature for crispiness', 'Wings will puff up']
            },
            {
                order: 5,
                title: 'Toss and serve',
                description: 'Immediately toss hot wings in sauce. Garnish with sesame seeds and sliced green onions. Serve hot.',
                duration: 5,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec' }],
                tips: ['Sauce while hot for better coating', 'Serve immediately for best texture']
            }
        ],
        tags: ['korean', 'chicken', 'spicy', 'fried', 'appetizer']
    },
    {
        title: 'Homemade Pork and Shrimp Wontons',
        short_description: 'Delicate wontons filled with juicy pork and shrimp. Perfect in soup or fried as appetizers.',
        image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb',
        difficulty: 'MEDIUM',
        total_minute: 60,
        cook_minute: 15,
        calories: 280,
        ingredients: [
            { ingredient_key: 'ground_pork', quantity: 300, unit: 'GRAM' },
            { ingredient_key: 'shrimp', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'wonton_wrapper', quantity: 40, unit: 'PIECE' },
            { ingredient_key: 'green_onion', quantity: 3, unit: 'STALK' },
            { ingredient_key: 'ginger', quantity: 15, unit: 'GRAM' },
            { ingredient_key: 'soy_sauce', quantity: 20, unit: 'MILLILITER' },
            { ingredient_key: 'sesame_oil', quantity: 10, unit: 'MILLILITER' },
            { ingredient_key: 'white_pepper', quantity: 1, unit: 'TEASPOON' },
        ],
        steps: [
            {
                order: 1,
                title: 'Prepare filling',
                description: 'Finely chop shrimp. Mix with pork, minced green onion, grated ginger, soy sauce, sesame oil, and white pepper. Mix in one direction until sticky.',
                duration: 15,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c' }],
                tips: ['Don\'t overmix', 'Chill filling for easier wrapping']
            },
            {
                order: 2,
                title: 'Wrap wontons',
                description: 'Place 1 teaspoon filling in center of wrapper. Wet edges with water, fold into triangle, then bring corners together. Seal well.',
                duration: 30,
                has_timer: false,
                media: [{ type: 'video', url: 'https://example.com/wonton-folding' }],
                tips: ['Keep wrappers covered', 'Press out air pockets']
            },
            {
                order: 3,
                title: 'Cook wontons',
                description: 'Bring large pot of water to boil. Add wontons, stir gently. Cook 5-6 minutes until they float and filling is cooked through.',
                duration: 10,
                has_timer: true,
                media: [],
                tips: ['Don\'t overcrowd pot', 'Can freeze uncooked wontons']
            },
            {
                order: 4,
                title: 'Serve',
                description: 'Serve in chicken broth with bok choy, or pan-fry for crispy wontons. Serve with soy-vinegar dipping sauce.',
                duration: 5,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1583892268481-e55f50eca444' }],
                tips: ['Add chili oil for spice', 'Garnish with cilantro']
            }
        ],
        tags: ['chinese', 'wonton', 'dumpling', 'pork', 'shrimp']
    },

    // Continue with more templates...
    // I'll add abbreviated versions to keep file manageable
];

// Simple non-recipe posts
const simplePosts = [
    {
        title: 'What\'s your secret ingredient for the perfect pasta sauce?',
        short_description: 'I\'ve been experimenting with different pasta sauces and want to know what ingredient you think makes all the difference!',
        image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
        tags: ['question', 'pasta', 'sauce', 'tips']
    },
    {
        title: '10 Essential Knife Skills Every Home Cook Should Master',
        short_description: 'From julienne to chiffonade, these cutting techniques will level up your cooking game.',
        image_url: 'https://images.unsplash.com/photo-1593006228757-c4f0d52d3a99',
        tags: ['tips', 'knife-skills', 'cooking-basics', 'tutorial']
    },
    {
        title: 'My First Attempt at Sourdough Bread!',
        short_description: 'After 3 failed attempts, I finally got a good rise! The crust is crispy and the crumb is perfect. So proud!',
        image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
        tags: ['sourdough', 'bread', 'baking', 'achievement']
    },
];

module.exports = {
    recipeTemplates,
    simplePosts
};

