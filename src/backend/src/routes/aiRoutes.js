const express = require("express");
const router = express.Router();
const {
    generateMenuWeek,
    imageRecognition,
    suggestedDishes,
    nutritionAnalysis
} = require('../controllers/aiControllers');

router.post("/generate-menu-week", generateMenuWeek);
router.post("/image-recognition", imageRecognition);
router.post("/suggested-dishes", suggestedDishes);
router.post("/nutrition-analysis", nutritionAnalysis);

module.exports = router;
