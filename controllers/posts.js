const Post = require('../models/Post');

const getPostsController = (req, res, next) => {
  // TODO
  return res.send({ message: 'hi' });
};

const createPostsController = (req, res, next) => {
  // TODO
  return next();
};

module.exports = { getPostsController, createPostsController };
