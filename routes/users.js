const express = require('express');
const router = express.Router();
const {
  loginController,
  registerController,
  becomeMemberController,
  logoutController,
} = require('../controllers/users');

router.post('/login', loginController);

router.post('/register', registerController);

router.post('/become-member', becomeMemberController);

router.get('/logout', logoutController);

module.exports = router;
