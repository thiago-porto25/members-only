const Post = require('../models/post.js');

function getPostsController(req, res, next) {
  if (req.isAuthenticated()) {
    Post.find()
      .populate('authorId')
      .exec(function (err, result) {
        if (err) return res.json(err);

        return res.json(result);
      });
  } else {
    Post.find().exec(function (err, result) {
      if (err) return res.json(err);

      return res.json(result);
    });
  }
}

function createPostsController(req, res, next) {
  const { title, content, authorId } = req.body;

  const post = new Post({
    title,
    content,
    authorId,
  });

  post.save(function (err, result) {
    if (err) return next(err);

    return res.send({ msg: 'Post created successfully', result });
  });
}

module.exports = { getPostsController, createPostsController };
