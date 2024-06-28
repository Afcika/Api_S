const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const auth = require('../middleware/auth');

router.post('/register', userService.register);
router.post('/login', userService.login);

// Example of a protected route
router.get('/profile', auth.verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId, userRole: req.userRole });
});

module.exports = router;
