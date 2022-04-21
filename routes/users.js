const express = require('express');
const router = express.Router();
const {
  loginController,
  registerController,
  becomeMemberController,
  logoutController,
} = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

router.post('/login', loginController);

router.post('/register', registerController);

router.post('/become-member', authMiddleware, becomeMemberController);

router.get('/logout', authMiddleware, logoutController);

module.exports = router;
