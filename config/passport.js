const passport = require('passport');
const bcryptjs = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }).exec(function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: 'Incorrect username.' });
      }
      bcryptjs.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { msg: 'Incorrect password.' });
        }
      });
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
