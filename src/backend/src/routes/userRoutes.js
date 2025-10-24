const express = require("express");
const router = express.Router();
const {
    changeLanguage,
    changeTheme,
    getUserAllergies,
    addAllergy,
    deleteAllergy,
    getUserProfile,
    markNotificationsSeen,
    deleteUserAccount,
    resetPassword,
    changeEmail,
    changeAvatar,
    showUserNotebook,
    overviewUserMealPlans,
    showUserMealPlans,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser
} = require('../controllers/userControllers');
const { authenticateToken } = require("../middleware/authMiddleware");


// Setting
router.post("/change-lang", authenticateToken, changeLanguage);
router.post("/change-theme", authenticateToken, changeTheme);
router.post("/reset-password", authenticateToken, resetPassword);
router.post("/change-email", authenticateToken, changeEmail);
router.post("/change-avatar", authenticateToken, changeAvatar);
router.delete("/delete-account", authenticateToken, deleteUserAccount);

// User data
router.post("/allergies", authenticateToken, getUserAllergies);
router.post("/add-allergy", authenticateToken, addAllergy);
router.post("/get-profile", getUserProfile); // Chưa test
router.post("/seen-notifications", authenticateToken, markNotificationsSeen);
router.post("/show-notebook", authenticateToken, showUserNotebook);
router.post("/overview-meal-plans", authenticateToken, overviewUserMealPlans);
router.post("/show-meal-plans", authenticateToken, showUserMealPlans);
router.post("/follow", authenticateToken, followUser);
router.post("unfollow", authenticateToken, unfollowUser);
router.post("/list-following", authenticateToken, getFollowing);
router.post("/list-followers", authenticateToken, getFollowers);
router.delete("/delete-allergy", authenticateToken, deleteAllergy);

module.exports = router;