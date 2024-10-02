const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

   
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header format is Bearer <token>' });
    }

    const token = authHeader.replace('Bearer ', '');

    
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

   
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(401).json({ error: 'Invalid token or user not found' });
    }

    
    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;