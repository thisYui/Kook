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
router.post("/allergies", getUserAllergies);
router.post("/add-allergy", addAllergy);
router.post("/get-profile", getUserProfile);
router.post("/seen-notifications", markNotificationsSeen);
router.post("/show-notebook", showUserNotebook);
router.post("/overview-meal-plans", overviewUserMealPlans);
router.post("/show-meal-plans", showUserMealPlans);
router.post("/follow", followUser);
router.post("unfollow", unfollowUser);
router.post("/list-following", getFollowing);
router.post("/list-followers", getFollowers);
router.delete("/delete-allergy", deleteAllergy);

module.exports = router;