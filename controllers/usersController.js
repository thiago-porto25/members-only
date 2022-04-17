const bcryptjs = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

const loginController = () => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  });
};

const registerController = (req, res) => {
  bcryptjs.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    const user = new User({
      email: req.body.email,
      password: hash,
    });

    user.save((err, result) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      res.status(201).json({
        msg: 'User created',
        result,
      });
    });
  });
};

const becomeMemberController = (req, res) => {
  // Check if secret code is correct
  if (req.body.secretCode === process.env.SECRET_CODE) {
    // Check if user is already a member
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      if (user.isMember) {
        return res.status(409).json({
          msg: 'User already is a member',
        });
      }

      // If is not a member and code correct, change user to member
      User.updateOne(
        { email: req.body.email },
        { isMember: true },
        (err, result) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }

          return res.status(200).json({ msg: 'You are now a member', result });
        }
      );
    });
  } else {
    // If not, return error saying that code is incorrect
    return res.send({ msg: 'Secret code is incorrect' });
  }
};

const logoutController = (req, res) => {
  req.logout();
  res.send({ msg: 'logout success' });
};

module.exports = {
  loginController,
  registerController,
  becomeMemberController,
  logoutController,
};
