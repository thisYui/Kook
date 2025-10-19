const express = require("express");
const {
    login,
    signup,
    confirmOTP,
    requestOTP,
    resetPassword,
    changeEmail,
    changePassword,
    changeAvatar,
    verifyToken,
    renewToken,
    logout,
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/confirm", confirmOTP);
router.post("/send-otp", requestOTP);
router.post("/reset-password", resetPassword);
router.post("/change-email", changeEmail);
router.post("/change-password", changePassword);
router.post("/change-avatar", changeAvatar);
router.post("/verify-token", verifyToken);
router.post("/renew-token", renewToken);
router.post("/logout", logout);

module.exports = router;