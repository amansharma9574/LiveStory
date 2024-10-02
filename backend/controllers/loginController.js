const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();


// Login
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
  

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password'});
    }

    const accessToken = jwt.sign({ 
      userId: user._id 
    }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

    const refreshToken = jwt.sign({ 
      userId: user._id 
    }, 
    process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    
    user.refreshToken = refreshToken;
       await user.save();
       user.password = undefined;
    res.json({ user, accessToken});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
