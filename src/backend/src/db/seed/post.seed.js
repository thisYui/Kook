const { PrismaClient } = require('@prisma/client');
const RecipeDetail = require('../../models/mongo/RecipeDetail');

const prisma = new PrismaClient();

/**
 * Post & Recipe Seed Data
 * Creates 40+ posts distributed unevenly among 20 users
 * Includes full recipe data with ingredients, steps (MongoDB), ratings, comments
 */

/**
 * Recipe Data Templates
 * Each template includes full post info, recipe metadata, ingredients, and cooking steps
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

    // Vegan - Sarah Williams (user4)
    {
        title: 'Creamy Vegan Mushroom Risotto',
        short_description: 'Rich and creamy risotto made without dairy. Loaded with umami mushrooms and finished with nutritional yeast.',
        image_url: 'https://images.unsplash.com/photo-1476124369491-c209e4e8533d',
        difficulty: 'MEDIUM',
        total_minute: 45,
        cook_minute: 35,
        calories: 340,
        ingredients: [
            { ingredient_key: 'arborio_rice', quantity: 300, unit: 'GRAM' },
            { ingredient_key: 'mushroom', quantity: 400, unit: 'GRAM' },
            { ingredient_key: 'vegetable_broth', quantity: 1, unit: 'LITER' },
            { ingredient_key: 'white_wine', quantity: 150, unit: 'MILLILITER' },
            { ingredient_key: 'onion', quantity: 1, unit: 'PIECE' },
            { ingredient_key: 'garlic', quantity: 3, unit: 'CLOVE' },
            { ingredient_key: 'nutritional_yeast', quantity: 40, unit: 'GRAM' },
            { ingredient_key: 'olive_oil', quantity: 40, unit: 'MILLILITER' },
            { ingredient_key: 'thyme', quantity: 2, unit: 'STALK' },
        ],
        steps: [
            {
                order: 1,
                title: 'Sauté mushrooms',
                description: 'Heat olive oil, cook sliced mushrooms until golden and liquid evaporates. Season with salt, pepper, and thyme. Set aside.',
                duration: 10,
                has_timer: false,
                media: [],
                tips: ['Don\'t stir too much for better browning', 'Use mix of mushroom varieties']
            },
            {
                order: 2,
                title: 'Toast rice',
                description: 'In same pot, sauté diced onion and garlic until soft. Add rice, toast for 2-3 minutes until edges become translucent.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Toasting adds nutty flavor', 'Stir constantly']
            },
            {
                order: 3,
                title: 'Add wine and cook',
                description: 'Pour in white wine, stir until absorbed. Keep warm broth nearby.',
                duration: 3,
                has_timer: false,
                media: [],
                tips: ['Wine adds acidity and depth']
            },
            {
                order: 4,
                title: 'Gradually add broth',
                description: 'Add broth one ladle at a time, stirring constantly. Wait until absorbed before adding more. Continue for 20-25 minutes until rice is creamy and al dente.',
                duration: 25,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1595908129746-d3fd4bafe1b8' }],
                tips: ['Constant stirring releases starch', 'Taste rice for doneness']
            },
            {
                order: 5,
                title: 'Finish and serve',
                description: 'Stir in mushrooms and nutritional yeast. Season with salt and pepper. Let rest 2 minutes, garnish with fresh herbs.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Should be flowing, not thick', 'Serve immediately']
            }
        ],
        tags: ['vegan', 'risotto', 'mushroom', 'italian', 'comfort-food']
    },
    {
        title: 'Rainbow Buddha Bowl with Tahini Dressing',
        short_description: 'Colorful and nutritious bowl packed with roasted vegetables, quinoa, chickpeas, and creamy tahini sauce.',
        image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        difficulty: 'EASY',
        total_minute: 40,
        cook_minute: 25,
        calories: 420,
        ingredients: [
            { ingredient_key: 'quinoa', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'chickpea', quantity: 400, unit: 'GRAM' },
            { ingredient_key: 'sweet_potato', quantity: 300, unit: 'GRAM' },
            { ingredient_key: 'broccoli', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'red_cabbage', quantity: 100, unit: 'GRAM' },
            { ingredient_key: 'avocado', quantity: 1, unit: 'PIECE' },
            { ingredient_key: 'tahini', quantity: 60, unit: 'GRAM' },
            { ingredient_key: 'lemon', quantity: 1, unit: 'PIECE' },
            { ingredient_key: 'maple_syrup', quantity: 15, unit: 'MILLILITER' },
        ],
        steps: [
            {
                order: 1,
                title: 'Cook quinoa',
                description: 'Rinse quinoa. Cook in 400ml water, bring to boil, then simmer covered for 15 minutes. Fluff with fork.',
                duration: 20,
                has_timer: true,
                media: [],
                tips: ['Rinse to remove bitterness', 'Let steam off heat 5 minutes']
            },
            {
                order: 2,
                title: 'Roast vegetables',
                description: 'Toss cubed sweet potato, chickpeas, and broccoli with olive oil, salt, pepper, and paprika. Roast at 425°F for 25 minutes.',
                duration: 25,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' }],
                tips: ['Spread in single layer', 'Flip halfway through']
            },
            {
                order: 3,
                title: 'Make tahini dressing',
                description: 'Whisk tahini, lemon juice, maple syrup, garlic, and water until smooth and pourable. Season with salt.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Add water gradually for desired consistency', 'Keeps in fridge 1 week']
            },
            {
                order: 4,
                title: 'Assemble bowls',
                description: 'Divide quinoa into bowls. Top with roasted vegetables, shredded red cabbage, sliced avocado. Drizzle with tahini dressing.',
                duration: 5,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38' }],
                tips: ['Arrange colorfully', 'Add seeds or nuts for crunch']
            }
        ],
        tags: ['vegan', 'healthy', 'buddha-bowl', 'quinoa', 'meal-prep']
    },

    // BBQ - David Martinez (user5) - Moderator
    {
        title: 'Texas-Style Smoked Brisket',
        short_description: 'Low and slow smoked beef brisket with a perfect bark and tender, juicy meat. The king of BBQ!',
        image_url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba',
        difficulty: 'HARD',
        total_minute: 780,
        cook_minute: 720,
        calories: 520,
        ingredients: [
            { ingredient_key: 'beef_brisket', quantity: 5, unit: 'KILOGRAM' },
            { ingredient_key: 'black_pepper', quantity: 50, unit: 'GRAM' },
            { ingredient_key: 'kosher_salt', quantity: 50, unit: 'GRAM' },
            { ingredient_key: 'garlic_powder', quantity: 20, unit: 'GRAM' },
            { ingredient_key: 'paprika', quantity: 15, unit: 'GRAM' },
        ],
        steps: [
            {
                order: 1,
                title: 'Trim the brisket',
                description: 'Trim fat cap to 1/4 inch thickness. Remove hard fat and silver skin. Square up the edges.',
                duration: 20,
                has_timer: false,
                media: [{ type: 'video', url: 'https://example.com/brisket-trim' }],
                tips: ['Keep fat cap for moisture', 'Use sharp knife']
            },
            {
                order: 2,
                title: 'Season generously',
                description: 'Mix salt, pepper, garlic powder, and paprika. Apply rub liberally on all sides. Let sit at room temp 1 hour.',
                duration: 65,
                has_timer: true,
                media: [],
                tips: ['More pepper than you think', 'Pat rub in gently']
            },
            {
                order: 3,
                title: 'Prepare smoker',
                description: 'Preheat smoker to 225-250°F. Use oak or hickory wood. Maintain steady temperature.',
                duration: 30,
                has_timer: false,
                media: [],
                tips: ['Clean smoke is key', 'Have extra fuel ready']
            },
            {
                order: 4,
                title: 'Smoke fat side up',
                description: 'Place brisket fat side up on smoker. Smoke for 6-8 hours until internal temp reaches 165°F and bark forms.',
                duration: 420,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1' }],
                tips: ['Don\'t open lid unnecessarily', 'Spritz with water every 2 hours']
            },
            {
                order: 5,
                title: 'Wrap and continue',
                description: 'Wrap tightly in butcher paper or foil. Return to smoker until internal temp reaches 203°F, about 4-6 more hours.',
                duration: 300,
                has_timer: true,
                media: [],
                tips: ['Probe should slide in like butter', 'Patience is crucial']
            },
            {
                order: 6,
                title: 'Rest and slice',
                description: 'Rest wrapped brisket in cooler for 2 hours minimum. Slice against the grain, pencil thickness.',
                duration: 125,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1558030006-450675393462' }],
                tips: ['Resting redistributes juices', 'Save point and flat separate']
            }
        ],
        tags: ['bbq', 'brisket', 'smoked', 'texas', 'beef']
    },

    // Pastry - Jessica Lee (user6)
    {
        title: 'Flaky Butter Croissants from Scratch',
        short_description: 'Buttery, flaky, golden croissants made at home. A labor of love that\'s absolutely worth it!',
        image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
        difficulty: 'HARD',
        total_minute: 1200,
        cook_minute: 25,
        calories: 280,
        ingredients: [
            { ingredient_key: 'bread_flour', quantity: 500, unit: 'GRAM' },
            { ingredient_key: 'butter', quantity: 280, unit: 'GRAM' },
            { ingredient_key: 'milk', quantity: 240, unit: 'MILLILITER' },
            { ingredient_key: 'sugar', quantity: 50, unit: 'GRAM' },
            { ingredient_key: 'yeast', quantity: 10, unit: 'GRAM' },
            { ingredient_key: 'salt', quantity: 10, unit: 'GRAM' },
            { ingredient_key: 'egg', quantity: 1, unit: 'PIECE' },
        ],
        steps: [
            {
                order: 1,
                title: 'Make dough',
                description: 'Mix flour, sugar, salt, yeast, warm milk, and 30g melted butter. Knead 5 minutes until smooth. Refrigerate 1 hour.',
                duration: 70,
                has_timer: true,
                media: [],
                tips: ['Don\'t overwork dough', 'Should be slightly sticky']
            },
            {
                order: 2,
                title: 'Prepare butter block',
                description: 'Pound 250g cold butter between parchment into 15x15cm square. Keep cold.',
                duration: 10,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' }],
                tips: ['Butter should be pliable, not soft', 'Same consistency as dough']
            },
            {
                order: 3,
                title: 'Laminate - First fold',
                description: 'Roll dough into 25x25cm square. Place butter block in center, fold dough over like envelope. Roll into rectangle, fold in thirds (letter fold). Chill 30 min.',
                duration: 40,
                has_timer: true,
                media: [{ type: 'video', url: 'https://example.com/lamination' }],
                tips: ['Keep edges even', 'Don\'t let butter break through']
            },
            {
                order: 4,
                title: 'Second and third folds',
                description: 'Repeat rolling and letter folding two more times, chilling 30 minutes between each fold.',
                duration: 90,
                has_timer: true,
                media: [],
                tips: ['Brush off excess flour', 'Work quickly to keep cold']
            },
            {
                order: 5,
                title: 'Shape croissants',
                description: 'Roll dough to 3mm thick. Cut into triangles. Stretch slightly, roll from wide end to point. Curve into crescent. Proof 2-3 hours until doubled.',
                duration: 200,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1623334044303-241021148842' }],
                tips: ['Keep point underneath', 'Proof until jiggly when shaken']
            },
            {
                order: 6,
                title: 'Bake',
                description: 'Brush with egg wash. Bake at 375°F for 20-25 minutes until deep golden brown. Cool on rack.',
                duration: 30,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd' }],
                tips: ['Don\'t overbake', 'Best served fresh and warm']
            }
        ],
        tags: ['pastry', 'croissant', 'french', 'breakfast', 'baking']
    },

    // Mexican - Maria Garcia (user8)
    {
        title: 'Authentic Chicken Mole Poblano',
        short_description: 'Rich, complex Mexican sauce with chocolate and chilies. A true celebration of flavors!',
        image_url: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df',
        difficulty: 'HARD',
        total_minute: 120,
        cook_minute: 90,
        calories: 480,
        ingredients: [
            { ingredient_key: 'chicken_thigh', quantity: 1, unit: 'KILOGRAM' },
            { ingredient_key: 'dried_chili', quantity: 100, unit: 'GRAM' },
            { ingredient_key: 'dark_chocolate', quantity: 50, unit: 'GRAM' },
            { ingredient_key: 'tomato', quantity: 3, unit: 'PIECE' },
            { ingredient_key: 'onion', quantity: 1, unit: 'PIECE' },
            { ingredient_key: 'garlic', quantity: 6, unit: 'CLOVE' },
            { ingredient_key: 'almond', quantity: 50, unit: 'GRAM' },
            { ingredient_key: 'raisin', quantity: 40, unit: 'GRAM' },
            { ingredient_key: 'cinnamon', quantity: 1, unit: 'TEASPOON' },
            { ingredient_key: 'cumin', quantity: 1, unit: 'TEASPOON' },
        ],
        steps: [
            {
                order: 1,
                title: 'Toast and rehydrate chilies',
                description: 'Toast dried chilies in dry pan until fragrant, 30 seconds. Soak in hot water 20 minutes. Remove stems and seeds.',
                duration: 25,
                has_timer: true,
                media: [],
                tips: ['Don\'t burn chilies', 'Save soaking liquid']
            },
            {
                order: 2,
                title: 'Roast vegetables',
                description: 'Char tomatoes, onion, and garlic under broiler or in dry pan until blackened in spots.',
                duration: 15,
                has_timer: false,
                media: [],
                tips: ['Charring adds depth', 'Turn for even roasting']
            },
            {
                order: 3,
                title: 'Toast spices and nuts',
                description: 'Lightly toast almonds, sesame seeds, cinnamon, and cumin in dry pan. Be careful not to burn.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Watch carefully', 'Should smell fragrant']
            },
            {
                order: 4,
                title: 'Blend mole sauce',
                description: 'Blend rehydrated chilies, roasted vegetables, toasted spices, almonds, raisins, chocolate, and 1 cup soaking liquid until very smooth.',
                duration: 10,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' }],
                tips: ['Blend in batches if needed', 'Should be thick but pourable']
            },
            {
                order: 5,
                title: 'Cook sauce',
                description: 'Fry sauce in oil over medium heat for 15 minutes, stirring constantly. Add chicken stock to desired consistency. Season with salt and sugar.',
                duration: 20,
                has_timer: false,
                media: [],
                tips: ['Frying develops flavor', 'Sauce should coat spoon']
            },
            {
                order: 6,
                title: 'Cook chicken',
                description: 'Poach chicken in sauce for 30-40 minutes until tender. Serve with rice, garnish with sesame seeds.',
                duration: 45,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1599974568925-714845b5f5b9' }],
                tips: ['Sauce thickens as it cooks', 'Mole tastes better next day']
            }
        ],
        tags: ['mexican', 'mole', 'chicken', 'chocolate', 'traditional']
    },

    // Pizza - Christopher Davis (user11)
    {
        title: 'Neapolitan Pizza Margherita',
        short_description: 'Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil. Simple perfection!',
        image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
        difficulty: 'MEDIUM',
        total_minute: 1500,
        cook_minute: 3,
        calories: 320,
        ingredients: [
            { ingredient_key: '00_flour', quantity: 500, unit: 'GRAM' },
            { ingredient_key: 'water', quantity: 325, unit: 'MILLILITER' },
            { ingredient_key: 'yeast', quantity: 2, unit: 'GRAM' },
            { ingredient_key: 'salt', quantity: 15, unit: 'GRAM' },
            { ingredient_key: 'san_marzano_tomato', quantity: 400, unit: 'GRAM' },
            { ingredient_key: 'fresh_mozzarella', quantity: 250, unit: 'GRAM' },
            { ingredient_key: 'basil', quantity: 10, unit: 'PIECE' },
            { ingredient_key: 'olive_oil', quantity: 30, unit: 'MILLILITER' },
        ],
        steps: [
            {
                order: 1,
                title: 'Make pizza dough',
                description: 'Mix flour, water, yeast, and salt. Knead 10 minutes until smooth and elastic. Cover, ferment at room temp 24 hours.',
                duration: 1455,
                has_timer: true,
                media: [],
                tips: ['Long fermentation = better flavor', 'Dough should double in size']
            },
            {
                order: 2,
                title: 'Divide and shape dough balls',
                description: 'Divide into 4 portions. Shape into tight balls. Let rest 2-4 hours at room temperature.',
                duration: 250,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' }],
                tips: ['Surface tension is key', 'Cover to prevent drying']
            },
            {
                order: 3,
                title: 'Prepare sauce',
                description: 'Crush San Marzano tomatoes by hand. Season with salt and olive oil. Don\'t cook.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Cold sauce is traditional', 'Cooks in the oven']
            },
            {
                order: 4,
                title: 'Preheat oven maximum',
                description: 'Heat oven to maximum temperature (500°F+) with pizza stone for at least 45 minutes.',
                duration: 45,
                has_timer: true,
                media: [],
                tips: ['Higher temp = better crust', 'Stone must be screaming hot']
            },
            {
                order: 5,
                title: 'Stretch and top',
                description: 'Gently stretch dough by hand to 10-12 inches, leaving puffy edge. Top with sauce, torn mozzarella, basil, and olive oil drizzle.',
                duration: 5,
                has_timer: false,
                media: [{ type: 'video', url: 'https://example.com/pizza-stretch' }],
                tips: ['Don\'t use rolling pin', 'Less is more with toppings']
            },
            {
                order: 6,
                title: 'Bake',
                description: 'Slide onto hot stone. Bake 90 seconds to 3 minutes until crust is charred and cheese bubbles. Fresh basil after baking.',
                duration: 5,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' }],
                tips: ['Watch carefully', 'Leopard spotting is good']
            }
        ],
        tags: ['pizza', 'italian', 'neapolitan', 'margherita', 'homemade']
    },

    // Street Food - Daniel Thomas (user13)
    {
        title: 'Banh Mi - Vietnamese Sandwich',
        short_description: 'Crispy baguette filled with savory pork, pickled vegetables, cilantro, and jalapeños. Street food perfection!',
        image_url: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9',
        difficulty: 'MEDIUM',
        total_minute: 180,
        cook_minute: 20,
        calories: 450,
        ingredients: [
            { ingredient_key: 'pork_shoulder', quantity: 500, unit: 'GRAM' },
            { ingredient_key: 'baguette', quantity: 4, unit: 'PIECE' },
            { ingredient_key: 'carrot', quantity: 2, unit: 'PIECE' },
            { ingredient_key: 'daikon', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'cucumber', quantity: 1, unit: 'PIECE' },
            { ingredient_key: 'cilantro', quantity: 1, unit: 'BUNCH' },
            { ingredient_key: 'jalapeno', quantity: 2, unit: 'PIECE' },
            { ingredient_key: 'fish_sauce', quantity: 40, unit: 'MILLILITER' },
            { ingredient_key: 'soy_sauce', quantity: 30, unit: 'MILLILITER' },
            { ingredient_key: 'mayonnaise', quantity: 60, unit: 'GRAM' },
        ],
        steps: [
            {
                order: 1,
                title: 'Marinate pork',
                description: 'Slice pork thinly. Marinate in fish sauce, soy sauce, sugar, garlic, lemongrass for 2 hours.',
                duration: 125,
                has_timer: true,
                media: [],
                tips: ['Overnight marinating is even better', 'Slice against grain']
            },
            {
                order: 2,
                title: 'Make pickled vegetables',
                description: 'Julienne carrot and daikon. Toss with sugar, salt, and vinegar. Let pickle at least 30 minutes.',
                duration: 35,
                has_timer: true,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52' }],
                tips: ['Quick pickle is fine', 'Squeeze out excess liquid before using']
            },
            {
                order: 3,
                title: 'Cook pork',
                description: 'Heat oil in pan. Cook marinated pork over high heat 3-4 minutes per side until caramelized and cooked through.',
                duration: 10,
                has_timer: false,
                media: [],
                tips: ['Don\'t overcrowd pan', 'Get good char for flavor']
            },
            {
                order: 4,
                title: 'Prepare bread',
                description: 'Slice baguettes lengthwise, leaving one side attached. Toast lightly if desired.',
                duration: 5,
                has_timer: false,
                media: [],
                tips: ['Bread should be crusty outside, soft inside']
            },
            {
                order: 5,
                title: 'Assemble sandwich',
                description: 'Spread mayo on bread. Layer pork, pickled vegetables, cucumber slices, cilantro, and jalapeño slices.',
                duration: 5,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2aa' }],
                tips: ['Add pate for traditional flavor', 'Serve immediately']
            }
        ],
        tags: ['vietnamese', 'banh-mi', 'sandwich', 'street-food', 'pork']
    },

    // Healthy - Linda Taylor (user10)
    {
        title: 'Meal Prep: Chicken Teriyaki Bowls',
        short_description: 'Healthy meal prep bowls with grilled chicken, vegetables, and homemade teriyaki sauce. Perfect for the week!',
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        difficulty: 'EASY',
        total_minute: 45,
        cook_minute: 25,
        calories: 420,
        ingredients: [
            { ingredient_key: 'chicken_breast', quantity: 800, unit: 'GRAM' },
            { ingredient_key: 'brown_rice', quantity: 400, unit: 'GRAM' },
            { ingredient_key: 'broccoli', quantity: 400, unit: 'GRAM' },
            { ingredient_key: 'carrot', quantity: 200, unit: 'GRAM' },
            { ingredient_key: 'soy_sauce', quantity: 80, unit: 'MILLILITER' },
            { ingredient_key: 'honey', quantity: 40, unit: 'GRAM' },
            { ingredient_key: 'ginger', quantity: 20, unit: 'GRAM' },
            { ingredient_key: 'garlic', quantity: 3, unit: 'CLOVE' },
            { ingredient_key: 'sesame_seed', quantity: 15, unit: 'GRAM' },
        ],
        steps: [
            {
                order: 1,
                title: 'Cook rice',
                description: 'Rinse brown rice. Cook according to package directions, about 40 minutes. Fluff and let cool.',
                duration: 45,
                has_timer: true,
                media: [],
                tips: ['Make rice ahead', 'Season lightly with salt']
            },
            {
                order: 2,
                title: 'Make teriyaki sauce',
                description: 'Combine soy sauce, honey, grated ginger, minced garlic, and cornstarch. Simmer until thickened, 5 minutes.',
                duration: 7,
                has_timer: false,
                media: [],
                tips: ['Make extra for future meals', 'Keeps 2 weeks refrigerated']
            },
            {
                order: 3,
                title: 'Cook chicken',
                description: 'Cut chicken into bite-size pieces. Cook in pan with oil until golden and cooked through, 10-12 minutes. Toss with half the teriyaki sauce.',
                duration: 15,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435' }],
                tips: ['Don\'t overcook', 'Reserve sauce for serving']
            },
            {
                order: 4,
                title: 'Steam vegetables',
                description: 'Steam broccoli florets and sliced carrots until tender-crisp, about 5-7 minutes.',
                duration: 10,
                has_timer: false,
                media: [],
                tips: ['Don\'t overcook veggies', 'Shock in ice water to preserve color']
            },
            {
                order: 5,
                title: 'Assemble meal prep containers',
                description: 'Divide rice, chicken, and vegetables into 4-5 containers. Drizzle remaining teriyaki sauce, sprinkle sesame seeds.',
                duration: 10,
                has_timer: false,
                media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1607532941433-304659e8198a' }],
                tips: ['Store up to 4 days', 'Microwave 2-3 minutes to reheat']
            }
        ],
        tags: ['meal-prep', 'healthy', 'chicken', 'teriyaki', 'asian']
    },
];

/**
 * Additional simpler post templates (non-recipe posts, questions, tips, etc.)
 */
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
    {
        title: 'Best Kitchen Gadgets Under $20',
        short_description: 'These affordable tools have completely changed how I cook. My top picks for budget-friendly kitchen essentials.',
        image_url: 'https://images.unsplash.com/photo-1556911261-6bd341186b2f',
        tags: ['kitchen-gadgets', 'budget-friendly', 'recommendations']
    },
    {
        title: 'How to Store Fresh Herbs to Keep Them Longer',
        short_description: 'Simple tricks to keep your fresh herbs vibrant and flavorful for weeks instead of days.',
        image_url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898',
        tags: ['tips', 'herbs', 'food-storage', 'kitchen-hacks']
    },
];

module.exports = {
    recipeTemplates,
    simplePosts
};

