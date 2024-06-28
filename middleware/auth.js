const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  },

  isAdmin: (req, res, next) => {
    if (req.userRole !== 'admin') return res.status(403).json({ error: 'Requires admin role' });
    next();
  }
};
