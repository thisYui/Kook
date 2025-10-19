const logger = require('../utils/logger');

/**
 * Có thể tìm theo id nguyên liệu hoặc tên nguyên liệu
 * Một trong 2 trường ingredientID hoặc text phải được cung cấp và trường còn lại có thể để trống
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function searchByIngredient(req, res) {
    const { ingredientID, text } = req.body;

    try {
        // TODO: Validate input
        // TODO: Search recipes by ingredients in MongoDB
        // TODO: Filter out recipes with excluded ingredients
        // TODO: Apply pagination
        // TODO: Return matching recipes

        res.status(200).json({ message: 'Tìm kiếm theo nguyên liệu thành công!' });

    } catch (error) {
        logger.error('Lỗi khi tìm kiếm theo nguyên liệu:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function searchByUserName(req, res) {
    const { username } = req.body;

    try {
        // TODO: Validate input
        // TODO: Search users by username
        // TODO: Apply pagination
        // TODO: Return matching users with basic info

        res.status(200).json({ message: 'Tìm kiếm người dùng thành công!' });

    } catch (error) {
        logger.error('Lỗi khi tìm kiếm người dùng:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function searchByTitle(req, res) {
    const { title } = req.body;

    try {
        // TODO: Validate input
        // TODO: Search posts by title
        // TODO: Apply pagination
        // TODO: Return matching posts

        res.status(200).json({ message: 'Tìm kiếm theo tiêu đề thành công!' });

    } catch (error) {
        logger.error('Lỗi khi tìm kiếm theo tiêu đề:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

module.exports = {
    searchByIngredient,
    searchByUserName,
    searchByTitle,
};

