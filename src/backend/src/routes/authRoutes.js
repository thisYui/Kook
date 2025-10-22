const express = require("express");
const {
    login,
    signup,
    confirmOTP,
    requestOTP,
    verifyToken,
    refreshToken,
    logout
} = require("../controllers/authControllers");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/confirm", confirmOTP);
router.post("/send-otp", requestOTP);
router.post("/verify-token", verifyToken);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;