const express = require("express");
const router = express.Router();
const { searchByIngredient,
    searchByUserName,
    searchByTitle
} = require('../controllers/searchControllers');

router.post("/search-by-ingredient", searchByIngredient);
router.post("/search-by-user-name", searchByUserName);
router.post("/search-by-title", searchByTitle);

module.exports = router;
