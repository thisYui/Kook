const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');

/**
 * tags (array): Một mảng bao gồm các tags liên quan đến bài viết.
 * countryCode: Mã quốc gia (ví dụ: "US" cho Hoa Kỳ, "VN" cho Việt Nam).
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function newPost(req, res) {
    const { uid, title, description, images, tags, countryCode, recipeData } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!title || title.trim().length === 0) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Title is required');
        }
        if (!description || description.trim().length === 0) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Description is required');
        }

        // TODO: Upload images to storage
        // TODO: Create post in database
        // TODO: Save recipe details to MongoDB if provided
        // TODO: Return created post

        res.status(200).json({ message: 'Tạo bài viết thành công!' });

    } catch (error) {
        logger.error('Lỗi khi tạo bài viết:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

/**
 * ratting là giá trị từ 1 đến 5
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function ratePost(req, res) {
    const { uid, postID, rating } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!postID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Post ID is required');
        }
        if (!rating || rating < 1 || rating > 5) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Rating must be between 1 and 5');
        }

        // TODO: Check user not rated before or update rating
        // TODO: Save rating to database
        // TODO: Update post average rating
        // TODO: Create notification for post owner

        res.status(200).json({ message: 'Đánh giá bài viết thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đánh giá bài viết:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function commentPost(req, res) {
    const { uid, postID, content } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!postID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Post ID is required');
        }
        if (!content || content.trim().length === 0) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Comment content is required');
        }

        // TODO: Check post exists
        // TODO: Create comment in database
        // TODO: Create notification for post owner or parent comment owner
        // TODO: Return created comment

        res.status(200).json({ message: 'Bình luận thành công!' });

    } catch (error) {
        logger.error('Lỗi khi bình luận:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function deleteCommentPost(req, res) {
    const { uid, commentId } = req.body;
    
    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!commentId) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Comment ID is required');
        }

        // TODO: Check user is comment owner
        // TODO: Soft delete comment (set deleted_at)
        
        res.status(200).json({ message: 'Xóa bình luận thành công!' });
    } catch (error) {
        logger.error('Lỗi khi xóa bình luận:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function deletePost(req, res) {
    const { uid, postID } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!postID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Post ID is required');
        }

        // TODO: Check user is post owner
        // TODO: Soft delete post (set deleted_at)
        // TODO: Delete associated files if needed

        res.status(200).json({ message: 'Xóa bài viết thành công!' });

    } catch (error) {
        logger.error('Lỗi khi xóa bài viết:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function repost(req, res) {
    const { uid, postID } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!postID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Post ID is required');
        }

        // TODO: Check post exists
        // TODO: Create repost entry
        // TODO: Increment repost count
        // TODO: Create notification for original post owner

        res.status(200).json({ message: 'Chia sẻ bài viết thành công!' });

    } catch (error) {
        logger.error('Lỗi khi chia sẻ bài viết:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function addPostToNotebook(req, res) {
    const { uid, postID } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!postID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Post ID is required');
        }

        // TODO: Check post exists
        // TODO: Add post to user's notebook
        // TODO: Create notification for post owner

        res.status(200).json({ message: 'Thêm vào sổ tay thành công!' });

    } catch (error) {
        logger.error('Lỗi khi thêm vào sổ tay:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function addNoteToRepost(req, res) {
    const { uid, repostID, stepOrder, content, color, startIndex, endIndex, version } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!repostID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Repost ID is required');
        }
        if (!stepOrder || stepOrder < 0) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Valid step order is required');
        }
        if (!content || content.trim().length === 0) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Note content is required');
        }

        res.status(200).json({ message: 'Thêm ghi chú thành công!' });

    } catch (error) {
        logger.error('Lỗi khi thêm ghi chú vào bài chia sẻ:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function deleteNoteToRepost(req, res) {
    const { uid, noteID } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }
        if (!noteID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Note ID is required');
        }

        res.status(200).json({ message: 'Xóa ghi chú thành công!' });

    } catch (error) {
        logger.error('Lỗi khi xóa ghi chú:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

module.exports = {
    newPost,
    ratePost,
    commentPost,
    deleteCommentPost,
    deletePost,
    repost,
    addPostToNotebook,
    addNoteToRepost,
    deleteNoteToRepost
};
