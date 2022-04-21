const bcryptjs = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user.js');

function loginController() {
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/',
    },
    (req, res) => {
      res.send({ msg: 'login success' });
    }
  );
}

function registerController(req, res) {
  bcryptjs.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    const user = new User({
      email: req.body.email,
      password: hash,
      isMember: false,
    });

    user.save(function (err, result) {
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
}

function becomeMemberController(req, res) {
  if (req.body.secretCode === process.env.SECRET_CODE) {
    User.findOne({ email: req.body.email }).exec(function (err, user) {
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

      User.updateOne(
        { email: req.body.email },
        { isMember: true },
        function (err, result) {
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
    return res.send({ msg: 'Secret code is incorrect' });
  }
}

function logoutController(req, res) {
  req.logout();
  res.send({ msg: 'logout success' });
}

module.exports = {
  loginController,
  registerController,
  becomeMemberController,
  logoutController,
};
