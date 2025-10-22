const express = require("express");
const router = express.Router();
const {
    changeLanguage,
    changeTheme,
    changeAllergyInfo,
    getUserProfile,
    markNotificationsSeen,
    deleteUserAccount,
    resetPassword,
    changeEmail,
    changePassword,
    changeAvatar,
    showUserNotebook,
    overviewUserMealPlans,
    showUserMealPlans,
    getFollowList
} = require('../controllers/userControllers');

router.post("/change-lang", changeLanguage);
router.post("/change-theme", changeTheme);
router.post("/change-allergy", changeAllergyInfo);
router.post("/get-profile", getUserProfile);
router.post("/seen-notifications", markNotificationsSeen);
router.delete("/delete-account", deleteUserAccount);
router.post("/reset-password", resetPassword);
router.post("/change-email", changeEmail);
router.post("/change-password", changePassword);
router.post("/change-avatar", changeAvatar);
router.post("/show-notebook", showUserNotebook);
router.post("/overview-meal-plans", overviewUserMealPlans);
router.post("/show-meal-plans", showUserMealPlans);
router.post("/get-follow-list", getFollowList);

module.exports = router;