const Post = require('../models/Post');

const getPostsController = (req, res, next) => {
  if (req.isAuthenticated()) {
    Post.find({})
      .sort({ createdAt: -1 })
      .populate('authorId')
      .exec((err, result) => {
        if (err) {
          return next(err);
        }
        return res.json(result);
      });
  } else {
    Post.find({}, { authorId: 0 })
      .sort({ createdAt: -1 })
      .exec((err, result) => {
        if (err) {
          return next(err);
        }
        return res.json(result);
      });
  }
};

const createPostsController = (req, res, next) => {
  const { title, content, authorId } = req.body;

  const post = new Post({
    title,
    content,
    authorId,
  });

  post.save((err, result) => {
    if (err) {
      return next(err);
    }
    return res.send({ msg: 'Post created successfully', result });
  });
};

module.exports = { getPostsController, createPostsController };
