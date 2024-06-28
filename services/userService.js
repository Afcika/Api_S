const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
          const { username, password, role } = req.body;
          const user = new User({ username, password, role });
          await user.save();
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
