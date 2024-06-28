const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const User = require('../models/User');

// Load environment variables
const configData = fs.readFileSync('.env');
const buf = Buffer.from(configData);
const config = dotenv.parse(buf);

module.exports = {
  requireLogin: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing_token' });
    }

    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'invalid_token' });
      }
      req.user = decoded;
      next();
    });
  },

  requireAdmin: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing_token' });
    }

    jwt.verify(token, config.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'invalid_token' });
      }

      try {
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'admin') {
          return res.status(403).json({ message: 'insufficient_permissions' });
        }
        req.user = decoded;
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server_error' });
      }
    });
  }
};
