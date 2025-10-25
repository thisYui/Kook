const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Ingredient Catalog Data
 * Comprehensive list of ingredients organized by category
 */

const ingredientCatalog = [
    // ===== VEGETABLES (Rau củ) =====
    { ingredient_key: 'tomato', display_name: 'Cà chua', category: 'VEGETABLES' },
    { ingredient_key: 'onion', display_name: 'Hành tây', category: 'VEGETABLES' },
    { ingredient_key: 'garlic', display_name: 'Tỏi', category: 'VEGETABLES' },
    { ingredient_key: 'potato', display_name: 'Khoai tây', category: 'VEGETABLES' },
    { ingredient_key: 'carrot', display_name: 'Cà rốt', category: 'VEGETABLES' },
    { ingredient_key: 'cabbage', display_name: 'Bắp cải', category: 'VEGETABLES' },
    { ingredient_key: 'lettuce', display_name: 'Rau xà lách', category: 'VEGETABLES' },
    { ingredient_key: 'cucumber', display_name: 'Dưa chuột', category: 'VEGETABLES' },
    { ingredient_key: 'bell_pepper', display_name: 'Ớt chuông', category: 'VEGETABLES' },
    { ingredient_key: 'chili_pepper', display_name: 'Ớt', category: 'VEGETABLES' },
    { ingredient_key: 'ginger', display_name: 'Gừng', category: 'VEGETABLES' },
    { ingredient_key: 'lemongrass', display_name: 'Sả', category: 'VEGETABLES' },
    { ingredient_key: 'scallion', display_name: 'Hành lá', category: 'VEGETABLES' },
    { ingredient_key: 'green_onion', display_name: 'Hành lá', category: 'VEGETABLES' },
    { ingredient_key: 'cilantro', display_name: 'Rau mùi', category: 'VEGETABLES' },
    { ingredient_key: 'basil', display_name: 'Húng quế', category: 'VEGETABLES' },
    { ingredient_key: 'mint', display_name: 'Rau húng', category: 'VEGETABLES' },
    { ingredient_key: 'spinach', display_name: 'Rau bina', category: 'VEGETABLES' },
    { ingredient_key: 'morning_glory', display_name: 'Rau muống', category: 'VEGETABLES' },
    { ingredient_key: 'celery', display_name: 'Cần tây', category: 'VEGETABLES' },
    { ingredient_key: 'broccoli', display_name: 'Bông cải xanh', category: 'VEGETABLES' },
    { ingredient_key: 'cauliflower', display_name: 'Bông cải trắng', category: 'VEGETABLES' },
    { ingredient_key: 'eggplant', display_name: 'Cà tím', category: 'VEGETABLES' },
    { ingredient_key: 'pumpkin', display_name: 'Bí đỏ', category: 'VEGETABLES' },
    { ingredient_key: 'zucchini', display_name: 'Bí xanh', category: 'VEGETABLES' },
    { ingredient_key: 'sweet_potato', display_name: 'Khoai lang', category: 'VEGETABLES' },
    { ingredient_key: 'corn', display_name: 'Ngô', category: 'VEGETABLES' },
    { ingredient_key: 'mushroom', display_name: 'Nấm', category: 'VEGETABLES' },
    { ingredient_key: 'shiitake_mushroom', display_name: 'Nấm hương', category: 'VEGETABLES' },
    { ingredient_key: 'wood_ear_mushroom', display_name: 'Nấm mèo', category: 'VEGETABLES' },
    { ingredient_key: 'bean_sprouts', display_name: 'Giá đỗ', category: 'VEGETABLES' },
    { ingredient_key: 'bamboo_shoots', display_name: 'Măng', category: 'VEGETABLES' },
    { ingredient_key: 'bok_choy', display_name: 'Cải thìa', category: 'VEGETABLES' },
    { ingredient_key: 'mustard_greens', display_name: 'Cải xanh', category: 'VEGETABLES' },
    { ingredient_key: 'water_spinach', display_name: 'Rau muống', category: 'VEGETABLES' },
    { ingredient_key: 'kale', display_name: 'Cải xoăn', category: 'VEGETABLES' },
    { ingredient_key: 'leek', display_name: 'Tỏi tây', category: 'VEGETABLES' },
    { ingredient_key: 'shallot', display_name: 'Hành tím', category: 'VEGETABLES' },
    { ingredient_key: 'pearl_onion', display_name: 'Hành tây bi', category: 'VEGETABLES' },
    { ingredient_key: 'parsley', display_name: 'Rau mùi tây', category: 'VEGETABLES' },
    { ingredient_key: 'dill', display_name: 'Rau thì là', category: 'VEGETABLES' },
    { ingredient_key: 'radish', display_name: 'Củ cải', category: 'VEGETABLES' },

    // ===== MEAT & POULTRY (Thịt) =====
    { ingredient_key: 'beef', display_name: 'Thịt bò', category: 'MEAT_POULTRY' },
    { ingredient_key: 'pork', display_name: 'Thịt lợn', category: 'MEAT_POULTRY' },
    { ingredient_key: 'chicken', display_name: 'Thịt gà', category: 'MEAT_POULTRY' },
    { ingredient_key: 'duck', display_name: 'Thịt vịt', category: 'MEAT_POULTRY' },
    { ingredient_key: 'lamb', display_name: 'Thịt cừu', category: 'MEAT_POULTRY' },
    { ingredient_key: 'turkey', display_name: 'Thịt gà tây', category: 'MEAT_POULTRY' },
    { ingredient_key: 'ground_beef', display_name: 'Thịt bò xay', category: 'MEAT_POULTRY' },
    { ingredient_key: 'ground_pork', display_name: 'Thịt lợn xay', category: 'MEAT_POULTRY' },
    { ingredient_key: 'chicken_breast', display_name: 'Ức gà', category: 'MEAT_POULTRY' },
    { ingredient_key: 'chicken_thigh', display_name: 'Đùi gà', category: 'MEAT_POULTRY' },
    { ingredient_key: 'chicken_wing', display_name: 'Cánh gà', category: 'MEAT_POULTRY' },
    { ingredient_key: 'pork_belly', display_name: 'Thịt ba chỉ', category: 'MEAT_POULTRY' },
    { ingredient_key: 'pork_ribs', display_name: 'Sườn lợn', category: 'MEAT_POULTRY' },
    { ingredient_key: 'bacon', display_name: 'Thịt xông khói', category: 'MEAT_POULTRY' },
    { ingredient_key: 'sausage', display_name: 'Xúc xích', category: 'MEAT_POULTRY' },
    { ingredient_key: 'ham', display_name: 'Giăm bông', category: 'MEAT_POULTRY' },
    { ingredient_key: 'liver', display_name: 'Gan', category: 'MEAT_POULTRY' },
    { ingredient_key: 'kidney', display_name: 'Thận', category: 'MEAT_POULTRY' },

    // ===== SEAFOOD (Hải sản) =====
    { ingredient_key: 'salmon', display_name: 'Cá hồi', category: 'SEAFOOD' },
    { ingredient_key: 'tuna', display_name: 'Cá ngừ', category: 'SEAFOOD' },
    { ingredient_key: 'mackerel', display_name: 'Cá thu', category: 'SEAFOOD' },
    { ingredient_key: 'tilapia', display_name: 'Cá diêu hồng', category: 'SEAFOOD' },
    { ingredient_key: 'catfish', display_name: 'Cá tra', category: 'SEAFOOD' },
    { ingredient_key: 'cod', display_name: 'Cá tuyết', category: 'SEAFOOD' },
    { ingredient_key: 'shrimp', display_name: 'Tôm', category: 'SEAFOOD' },
    { ingredient_key: 'prawn', display_name: 'Tôm sú', category: 'SEAFOOD' },
    { ingredient_key: 'crab', display_name: 'Cua', category: 'SEAFOOD' },
    { ingredient_key: 'lobster', display_name: 'Tôm hùm', category: 'SEAFOOD' },
    { ingredient_key: 'squid', display_name: 'Mực', category: 'SEAFOOD' },
    { ingredient_key: 'octopus', display_name: 'Bạch tuộc', category: 'SEAFOOD' },
    { ingredient_key: 'clam', display_name: 'Nghêu', category: 'SEAFOOD' },
    { ingredient_key: 'mussel', display_name: 'Vẹm', category: 'SEAFOOD' },
    { ingredient_key: 'oyster', display_name: 'Hàu', category: 'SEAFOOD' },
    { ingredient_key: 'scallop', display_name: 'Sò điệp', category: 'SEAFOOD' },
    { ingredient_key: 'snail', display_name: 'Ốc', category: 'SEAFOOD' },
    { ingredient_key: 'fish_sauce', display_name: 'Nước mắm', category: 'SEAFOOD' },
    { ingredient_key: 'shrimp_paste', display_name: 'Mắm tôm', category: 'SEAFOOD' },

    // ===== DAIRY & EGGS (Sữa & Trứng) =====
    { ingredient_key: 'milk', display_name: 'Sữa tươi', category: 'DAIRY_EGGS' },
    { ingredient_key: 'condensed_milk', display_name: 'Sữa đặc', category: 'DAIRY_EGGS' },
    { ingredient_key: 'evaporated_milk', display_name: 'Sữa đặc không đường', category: 'DAIRY_EGGS' },
    { ingredient_key: 'heavy_cream', display_name: 'Kem tươi', category: 'DAIRY_EGGS' },
    { ingredient_key: 'sour_cream', display_name: 'Kem chua', category: 'DAIRY_EGGS' },
    { ingredient_key: 'yogurt', display_name: 'Sữa chua', category: 'DAIRY_EGGS' },
    { ingredient_key: 'butter', display_name: 'Bơ', category: 'DAIRY_EGGS' },
    { ingredient_key: 'cheese', display_name: 'Phô mai', category: 'DAIRY_EGGS' },
    { ingredient_key: 'cheddar_cheese', display_name: 'Phô mai Cheddar', category: 'DAIRY_EGGS' },
    { ingredient_key: 'mozzarella_cheese', display_name: 'Phô mai Mozzarella', category: 'DAIRY_EGGS' },
    { ingredient_key: 'parmesan_cheese', display_name: 'Phô mai Parmesan', category: 'DAIRY_EGGS' },
    { ingredient_key: 'cream_cheese', display_name: 'Phô mai kem', category: 'DAIRY_EGGS' },
    { ingredient_key: 'egg', display_name: 'Trứng gà', category: 'DAIRY_EGGS' },
    { ingredient_key: 'egg_yolk', display_name: 'Lòng đỏ trứng', category: 'DAIRY_EGGS' },
    { ingredient_key: 'egg_white', display_name: 'Lòng trắng trứng', category: 'DAIRY_EGGS' },
    { ingredient_key: 'duck_egg', display_name: 'Trứng vịt', category: 'DAIRY_EGGS' },
    { ingredient_key: 'quail_egg', display_name: 'Trứng cút', category: 'DAIRY_EGGS' },

    // ===== GRAINS & LEGUMES (Ngũ cốc & Đậu) =====
    { ingredient_key: 'rice', display_name: 'Gạo', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'jasmine_rice', display_name: 'Gạo thơm', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'sticky_rice', display_name: 'Gạo nếp', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'brown_rice', display_name: 'Gạo lứt', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'wheat_flour', display_name: 'Bột mì', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'flour', display_name: 'Bột mì đa dụng', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'bread_flour', display_name: 'Bột mì làm bánh mì', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'cake_flour', display_name: 'Bột mì làm bánh', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'rice_flour', display_name: 'Bột gạo', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'tapioca_starch', display_name: 'Bột năng', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'potato_starch', display_name: 'Bột khoai tây', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'cornstarch', display_name: 'Bột ngô', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'pasta', display_name: 'Mì Ý', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'spaghetti', display_name: 'Spaghetti', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'noodles', display_name: 'Mì', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'rice_noodles', display_name: 'Bánh phở', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'vermicelli', display_name: 'Bún', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'glass_noodles', display_name: 'Miến', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'instant_noodles', display_name: 'Mì gói', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'wonton_wrapper', display_name: 'Vỏ hoành thánh', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'dumpling_wrapper', display_name: 'Vỏ há cảo', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'spring_roll_wrapper', display_name: 'Bánh tráng nem', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'oats', display_name: 'Yến mạch', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'quinoa', display_name: 'Quinoa', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'bread', display_name: 'Bánh mì', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'white_bread', display_name: 'Bánh mì trắng', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'whole_wheat_bread', display_name: 'Bánh mì nguyên cám', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'soybeans', display_name: 'Đậu nành', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'tofu', display_name: 'Đậu phụ', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'soy_milk', display_name: 'Sữa đậu nành', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'soy_sauce', display_name: 'Nước tương', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'black_beans', display_name: 'Đậu đen', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'red_beans', display_name: 'Đậu đỏ', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'green_beans', display_name: 'Đậu xanh', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'chickpeas', display_name: 'Đậu gà', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'lentils', display_name: 'Đậu lăng', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'peanuts', display_name: 'Đậu phộng', category: 'GRAINS_LEGUMES' },
    { ingredient_key: 'peanut_butter', display_name: 'Bơ đậu phộng', category: 'GRAINS_LEGUMES' },

    // ===== FRUITS (Trái cây) =====
    { ingredient_key: 'apple', display_name: 'Táo', category: 'FRUITS' },
    { ingredient_key: 'banana', display_name: 'Chuối', category: 'FRUITS' },
    { ingredient_key: 'orange', display_name: 'Cam', category: 'FRUITS' },
    { ingredient_key: 'lemon', display_name: 'Chanh vàng', category: 'FRUITS' },
    { ingredient_key: 'lime', display_name: 'Chanh', category: 'FRUITS' },
    { ingredient_key: 'mango', display_name: 'Xoài', category: 'FRUITS' },
    { ingredient_key: 'pineapple', display_name: 'Dứa', category: 'FRUITS' },
    { ingredient_key: 'papaya', display_name: 'Đu đủ', category: 'FRUITS' },
    { ingredient_key: 'watermelon', display_name: 'Dưa hấu', category: 'FRUITS' },
    { ingredient_key: 'strawberry', display_name: 'Dâu tây', category: 'FRUITS' },
    { ingredient_key: 'blueberry', display_name: 'Việt quất', category: 'FRUITS' },
    { ingredient_key: 'raspberry', display_name: 'Mâm xôi', category: 'FRUITS' },
    { ingredient_key: 'grape', display_name: 'Nho', category: 'FRUITS' },
    { ingredient_key: 'avocado', display_name: 'Bơ', category: 'FRUITS' },
    { ingredient_key: 'coconut', display_name: 'Dừa', category: 'FRUITS' },
    { ingredient_key: 'coconut_milk', display_name: 'Nước cốt dừa', category: 'FRUITS' },
    { ingredient_key: 'coconut_cream', display_name: 'Kem dừa', category: 'FRUITS' },
    { ingredient_key: 'kiwi', display_name: 'Kiwi', category: 'FRUITS' },
    { ingredient_key: 'peach', display_name: 'Đào', category: 'FRUITS' },
    { ingredient_key: 'pear', display_name: 'Lê', category: 'FRUITS' },
    { ingredient_key: 'plum', display_name: 'Mận', category: 'FRUITS' },
    { ingredient_key: 'cherry', display_name: 'Cherry', category: 'FRUITS' },
    { ingredient_key: 'dragon_fruit', display_name: 'Thanh long', category: 'FRUITS' },
    { ingredient_key: 'lychee', display_name: 'Vải', category: 'FRUITS' },
    { ingredient_key: 'longan', display_name: 'Nhãn', category: 'FRUITS' },
    { ingredient_key: 'rambutan', display_name: 'Chôm chôm', category: 'FRUITS' },
    { ingredient_key: 'durian', display_name: 'Sầu riêng', category: 'FRUITS' },
    { ingredient_key: 'jackfruit', display_name: 'Mít', category: 'FRUITS' },
    { ingredient_key: 'passion_fruit', display_name: 'Chanh dây', category: 'FRUITS' },
    { ingredient_key: 'pomelo', display_name: 'Bưởi', category: 'FRUITS' },

    // ===== SPICES & HERBS (Gia vị & Thảo mộc) =====
    { ingredient_key: 'salt', display_name: 'Muối', category: 'SPICES_HERBS' },
    { ingredient_key: 'sugar', display_name: 'Đường', category: 'SPICES_HERBS' },
    { ingredient_key: 'brown_sugar', display_name: 'Đường nâu', category: 'SPICES_HERBS' },
    { ingredient_key: 'honey', display_name: 'Mật ong', category: 'SPICES_HERBS' },
    { ingredient_key: 'black_pepper', display_name: 'Tiêu đen', category: 'SPICES_HERBS' },
    { ingredient_key: 'white_pepper', display_name: 'Tiêu trắng', category: 'SPICES_HERBS' },
    { ingredient_key: 'cinnamon', display_name: 'Quế', category: 'SPICES_HERBS' },
    { ingredient_key: 'star_anise', display_name: 'Hồi', category: 'SPICES_HERBS' },
    { ingredient_key: 'cardamom', display_name: 'Thảo quả', category: 'SPICES_HERBS' },
    { ingredient_key: 'clove', display_name: 'Đinh hương', category: 'SPICES_HERBS' },
    { ingredient_key: 'coriander_seeds', display_name: 'Hạt ngò', category: 'SPICES_HERBS' },
    { ingredient_key: 'cumin', display_name: 'Thìa là', category: 'SPICES_HERBS' },
    { ingredient_key: 'turmeric', display_name: 'Nghệ', category: 'SPICES_HERBS' },
    { ingredient_key: 'paprika', display_name: 'Ớt bột', category: 'SPICES_HERBS' },
    { ingredient_key: 'chili_powder', display_name: 'Bột ớt', category: 'SPICES_HERBS' },
    { ingredient_key: 'curry_powder', display_name: 'Bột cà ri', category: 'SPICES_HERBS' },
    { ingredient_key: 'five_spice_powder', display_name: 'Ngũ vị hương', category: 'SPICES_HERBS' },
    { ingredient_key: 'msg', display_name: 'Bột ngọt', category: 'SPICES_HERBS' },
    { ingredient_key: 'chicken_powder', display_name: 'Bột gà', category: 'SPICES_HERBS' },
    { ingredient_key: 'oyster_sauce', display_name: 'Dầu hào', category: 'SPICES_HERBS' },
    { ingredient_key: 'sesame_oil', display_name: 'Dầu mè', category: 'SPICES_HERBS' },
    { ingredient_key: 'vegetable_oil', display_name: 'Dầu ăn', category: 'SPICES_HERBS' },
    { ingredient_key: 'olive_oil', display_name: 'Dầu ô liu', category: 'SPICES_HERBS' },
    { ingredient_key: 'coconut_oil', display_name: 'Dầu dừa', category: 'SPICES_HERBS' },
    { ingredient_key: 'vinegar', display_name: 'Giấm', category: 'SPICES_HERBS' },
    { ingredient_key: 'rice_vinegar', display_name: 'Giấm gạo', category: 'SPICES_HERBS' },
    { ingredient_key: 'apple_cider_vinegar', display_name: 'Giấm táo', category: 'SPICES_HERBS' },
    { ingredient_key: 'ketchup', display_name: 'Tương cà', category: 'SPICES_HERBS' },
    { ingredient_key: 'mayonnaise', display_name: 'Mayonnaise', category: 'SPICES_HERBS' },
    { ingredient_key: 'mustard', display_name: 'Mù tạt', category: 'SPICES_HERBS' },
    { ingredient_key: 'sriracha', display_name: 'Tương ớt Sriracha', category: 'SPICES_HERBS' },
    { ingredient_key: 'hoisin_sauce', display_name: 'Tương đen', category: 'SPICES_HERBS' },
    { ingredient_key: 'chili_sauce', display_name: 'Tương ớt', category: 'SPICES_HERBS' },
    { ingredient_key: 'tamarind_paste', display_name: 'Me', category: 'SPICES_HERBS' },
    { ingredient_key: 'bay_leaf', display_name: 'Lá nguyệt quế', category: 'SPICES_HERBS' },
    { ingredient_key: 'thyme', display_name: 'Húng tây', category: 'SPICES_HERBS' },
    { ingredient_key: 'rosemary', display_name: 'Hương thảo', category: 'SPICES_HERBS' },
    { ingredient_key: 'oregano', display_name: 'Lá oregano', category: 'SPICES_HERBS' },
    { ingredient_key: 'sage', display_name: 'Xô thơm', category: 'SPICES_HERBS' },
    { ingredient_key: 'vanilla_extract', display_name: 'Tinh chất vani', category: 'SPICES_HERBS' },
    { ingredient_key: 'vanilla_bean', display_name: 'Quả vani', category: 'SPICES_HERBS' },
    { ingredient_key: 'almond_extract', display_name: 'Tinh chất hạnh nhân', category: 'SPICES_HERBS' },
    { ingredient_key: 'gochujang', display_name: 'Tương ớt Hàn Quốc', category: 'SPICES_HERBS' },
    { ingredient_key: 'gochugaru', display_name: 'Ớt bột Hàn Quốc', category: 'SPICES_HERBS' },
    { ingredient_key: 'miso_paste', display_name: 'Tương miso', category: 'SPICES_HERBS' },

    // ===== NUTS & SEEDS (Các loại hạt) =====
    { ingredient_key: 'almonds', display_name: 'Hạnh nhân', category: 'NUTS_SEEDS' },
    { ingredient_key: 'walnuts', display_name: 'Hạt óc chó', category: 'NUTS_SEEDS' },
    { ingredient_key: 'cashews', display_name: 'Hạt điều', category: 'NUTS_SEEDS' },
    { ingredient_key: 'pistachios', display_name: 'Hạt dẻ cười', category: 'NUTS_SEEDS' },
    { ingredient_key: 'macadamia', display_name: 'Hạt macadamia', category: 'NUTS_SEEDS' },
    { ingredient_key: 'hazelnuts', display_name: 'Hạt phỉ', category: 'NUTS_SEEDS' },
    { ingredient_key: 'pecans', display_name: 'Hạt pecan', category: 'NUTS_SEEDS' },
    { ingredient_key: 'pine_nuts', display_name: 'Hạt thông', category: 'NUTS_SEEDS' },
    { ingredient_key: 'sesame_seeds', display_name: 'Hạt mè', category: 'NUTS_SEEDS' },
    { ingredient_key: 'sesame_seed', display_name: 'Hạt mè', category: 'NUTS_SEEDS' },
    { ingredient_key: 'sunflower_seeds', display_name: 'Hạt hướng dương', category: 'NUTS_SEEDS' },
    { ingredient_key: 'pumpkin_seeds', display_name: 'Hạt bí', category: 'NUTS_SEEDS' },
    { ingredient_key: 'chia_seeds', display_name: 'Hạt chia', category: 'NUTS_SEEDS' },
    { ingredient_key: 'flax_seeds', display_name: 'Hạt lanh', category: 'NUTS_SEEDS' },
    { ingredient_key: 'poppy_seeds', display_name: 'Hạt anh túc', category: 'NUTS_SEEDS' },

    // ===== BEVERAGES (Đồ uống) =====
    { ingredient_key: 'water', display_name: 'Nước', category: 'BEVERAGES' },
    { ingredient_key: 'stock', display_name: 'Nước dùng', category: 'BEVERAGES' },
    { ingredient_key: 'chicken_stock', display_name: 'Nước dùng gà', category: 'BEVERAGES' },
    { ingredient_key: 'beef_stock', display_name: 'Nước dùng bò', category: 'BEVERAGES' },
    { ingredient_key: 'vegetable_stock', display_name: 'Nước dùng rau', category: 'BEVERAGES' },
    { ingredient_key: 'coffee', display_name: 'Cà phê', category: 'BEVERAGES' },
    { ingredient_key: 'tea', display_name: 'Trà', category: 'BEVERAGES' },
    { ingredient_key: 'green_tea', display_name: 'Trà xanh', category: 'BEVERAGES' },
    { ingredient_key: 'black_tea', display_name: 'Trà đen', category: 'BEVERAGES' },
    { ingredient_key: 'wine', display_name: 'Rượu vang', category: 'BEVERAGES' },
    { ingredient_key: 'red_wine', display_name: 'Rượu vang đỏ', category: 'BEVERAGES' },
    { ingredient_key: 'white_wine', display_name: 'Rượu vang trắng', category: 'BEVERAGES' },
    { ingredient_key: 'beer', display_name: 'Bia', category: 'BEVERAGES' },
    { ingredient_key: 'sake', display_name: 'Rượu sake', category: 'BEVERAGES' },
    { ingredient_key: 'rice_wine', display_name: 'Rượu nếp', category: 'BEVERAGES' },
    { ingredient_key: 'cooking_wine', display_name: 'Rượu nấu ăn', category: 'BEVERAGES' },

    // ===== BAKING & DESSERT (Nguyên liệu làm bánh) =====
    { ingredient_key: 'baking_powder', display_name: 'Bột nở', category: 'BAKING_DESSERT' },
    { ingredient_key: 'baking_soda', display_name: 'Baking soda', category: 'BAKING_DESSERT' },
    { ingredient_key: 'yeast', display_name: 'Men', category: 'BAKING_DESSERT' },
    { ingredient_key: 'gelatin', display_name: 'Gelatin', category: 'BAKING_DESSERT' },
    { ingredient_key: 'agar_agar', display_name: 'Thạch rau câu', category: 'BAKING_DESSERT' },
    { ingredient_key: 'cocoa_powder', display_name: 'Bột ca cao', category: 'BAKING_DESSERT' },
    { ingredient_key: 'chocolate', display_name: 'Sô cô la', category: 'BAKING_DESSERT' },
    { ingredient_key: 'dark_chocolate', display_name: 'Sô cô la đen', category: 'BAKING_DESSERT' },
    { ingredient_key: 'milk_chocolate', display_name: 'Sô cô la sữa', category: 'BAKING_DESSERT' },
    { ingredient_key: 'white_chocolate', display_name: 'Sô cô la trắng', category: 'BAKING_DESSERT' },
    { ingredient_key: 'chocolate_chips', display_name: 'Chocolate chips', category: 'BAKING_DESSERT' },
    { ingredient_key: 'marshmallow', display_name: 'Kẹo dẻo', category: 'BAKING_DESSERT' },
    { ingredient_key: 'sprinkles', display_name: 'Hạt rắc trang trí', category: 'BAKING_DESSERT' },
    { ingredient_key: 'food_coloring', display_name: 'Màu thực phẩm', category: 'BAKING_DESSERT' },
    { ingredient_key: 'powdered_sugar', display_name: 'Đường bột', category: 'BAKING_DESSERT' },
    { ingredient_key: 'caramel', display_name: 'Caramel', category: 'BAKING_DESSERT' },

    // ===== CANNED & PRESERVED (Đồ hộp & Bảo quản) =====
    { ingredient_key: 'canned_tomatoes', display_name: 'Cà chua hộp', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'tomato_paste', display_name: 'Tương cà đặc', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'tomato_sauce', display_name: 'Nước sốt cà chua', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'canned_corn', display_name: 'Ngô hộp', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'canned_tuna', display_name: 'Cá ngừ hộp', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'canned_sardines', display_name: 'Cá mòi hộp', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'canned_pineapple', display_name: 'Dứa hộp', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'canned_peaches', display_name: 'Đào hộp', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'pickles', display_name: 'Dưa chua', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'pickled_vegetables', display_name: 'Rau củ muối chua', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'olives', display_name: 'Ô liu', category: 'CANNED_PRESERVED' },
    { ingredient_key: 'capers', display_name: 'Nụ bạch hoa', category: 'CANNED_PRESERVED' },

    // ===== FROZEN (Đồ đông lạnh) =====
    { ingredient_key: 'frozen_vegetables', display_name: 'Rau củ đông lạnh', category: 'FROZEN' },
    { ingredient_key: 'frozen_peas', display_name: 'Đậu Hà Lan đông lạnh', category: 'FROZEN' },
    { ingredient_key: 'frozen_corn', display_name: 'Ngô đông lạnh', category: 'FROZEN' },
    { ingredient_key: 'frozen_mixed_vegetables', display_name: 'Rau củ hỗn hợp đông lạnh', category: 'FROZEN' },
    { ingredient_key: 'frozen_berries', display_name: 'Quả mọng đông lạnh', category: 'FROZEN' },
    { ingredient_key: 'ice_cream', display_name: 'Kem', category: 'FROZEN' },

    // ===== OTHERS (Khác) =====
    { ingredient_key: 'instant_coffee', display_name: 'Cà phê hòa tan', category: 'OTHERS' },
    { ingredient_key: 'matcha_powder', display_name: 'Bột trà xanh matcha', category: 'OTHERS' },
    { ingredient_key: 'protein_powder', display_name: 'Bột protein', category: 'OTHERS' },
    { ingredient_key: 'nutritional_yeast', display_name: 'Men dinh dưỡng', category: 'OTHERS' },

    // ===== Not found / Uncategorized =====
    { ingredient_key: 'not_found', display_name: 'Không tìm thấy', category: 'UNCATEGORIZED' },
];

/**
 * Seed ingredient catalog
 */
async function seedIngredientCatalog() {
    console.log('Starting ingredient catalog seeding...');

    try {
        // Check if catalog already exists
        const existingCount = await prisma.ingredientCatalog.count();
        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} ingredients. Skipping seed.`);
            console.log('💡 To re-seed, please clear the ingredient_catalog table first.');
            return;
        }

        // Create ingredients
        let created = 0;
        for (const ingredient of ingredientCatalog) {
            await prisma.ingredientCatalog.create({
                data: ingredient
            });
            created++;
        }

        console.log(`\nSuccessfully created ${created} ingredients!`);
        console.log('\nIngredient Summary by Category:');
        
        // Count by category
        const categories = [...new Set(ingredientCatalog.map(i => i.category))];
        for (const category of categories) {
            const count = ingredientCatalog.filter(i => i.category === category).length;
            console.log(`   - ${category}: ${count} items`);
        }

    } catch (error) {
        console.error('Error seeding ingredient catalog:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    seedIngredientCatalog()
        .then(() => {
            console.log('\nIngredient catalog seed completed!');
            prisma.$disconnect();
        })
        .catch((error) => {
            console.error('Seed failed:', error);
            prisma.$disconnect();
            process.exit(1);
        });
}

module.exports = { seedIngredientCatalog, ingredientCatalog };
