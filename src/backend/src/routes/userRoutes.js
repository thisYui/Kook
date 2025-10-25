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
    showPostNotebook,
    overviewUserMealPlans,
    showUserMealPlans,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
    overviewNoteBook
} = require('../controllers/userControllers');
const { authenticateToken } = require("../middleware/authMiddleware");


// Setting
router.post("/change-lang", authenticateToken, changeLanguage);
router.post("/change-theme", changeTheme);
router.post("/reset-password", authenticateToken, resetPassword);
router.post("/change-email", authenticateToken, changeEmail);
router.post("/change-avatar", authenticateToken, changeAvatar);
router.delete("/delete-account", authenticateToken, deleteUserAccount);

// Profile
router.post("/get-profile", authenticateToken, getUserProfile);
//router.post("/add-meal-plan")
router.post("/overview-meal-plans", authenticateToken, overviewUserMealPlans);
router.post("/overview-meal-plans", authenticateToken, overviewNoteBook);
router.post("/follow", authenticateToken, followUser);
router.post("/unfollow", authenticateToken, unfollowUser);
router.post("/list-following", authenticateToken, getFollowing);
router.post("/list-followers", authenticateToken, getFollowers);

// Detail data
router.post("/allergies", authenticateToken, getUserAllergies);
router.post("/add-allergy", authenticateToken, addAllergy);
router.post("/seen-notifications", authenticateToken, markNotificationsSeen);
router.post("/show-post-notebook", authenticateToken, showPostNotebook);
router.post("/show-meal-plans", authenticateToken, showUserMealPlans);
router.delete("/delete-allergy", authenticateToken, deleteAllergy);

module.exports = router;