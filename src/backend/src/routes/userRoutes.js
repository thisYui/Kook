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
    getFollowList
} = require('../controllers/userControllers');

router.post("/change-lang", changeLanguage);
router.post("/change-theme", changeTheme);
router.post("/allergies", getUserAllergies);
router.post("/add-allergy", addAllergy);
router.delete("/delete-allergy", deleteAllergy);
router.post("/get-profile", getUserProfile);
router.post("/seen-notifications", markNotificationsSeen);
router.delete("/delete-account", deleteUserAccount);
router.post("/reset-password", resetPassword);
router.post("/change-email", changeEmail);
router.post("/change-avatar", changeAvatar);
router.post("/show-notebook", showUserNotebook);
router.post("/overview-meal-plans", overviewUserMealPlans);
router.post("/show-meal-plans", showUserMealPlans);
router.post("/get-follow-list", getFollowList);

module.exports = router;