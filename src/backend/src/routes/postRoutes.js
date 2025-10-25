const express = require("express");
const router = express.Router();
const {
    viewPost,
    newPost,
    ratePost,
    commentPost,
    deleteCommentPost,
    deletePost,
    repost,
    addPostToNotebook,
    addNoteToRepost,
    deleteNoteToRepost
} = require('../controllers/postControllers');
const { authenticateToken } = require("../middleware/authMiddleware");


router.post("post/:id", viewPost)
router.post("/post", newPost);
router.post("/rating-post", ratePost);
router.post("/new-comment-post", commentPost);
router.delete("/delete-comment-post", deleteCommentPost);
router.delete("/delete-post", deletePost);
router.post("/repost", repost);
router.post("/add-notebook", addPostToNotebook);
router.post("/add-note", addNoteToRepost);
router.delete("/delete-note", deleteNoteToRepost);

module.exports = router;
