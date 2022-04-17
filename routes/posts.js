const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getPostsController,
  createPostsController,
} = require('../controllers/posts');

router.get('/', getPostsController);

router.post('/create', authMiddleware, createPostsController);

module.exports = router;
