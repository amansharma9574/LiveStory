const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res) => {
  try {
    const { email, password, username, name} = req.body;
   
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      name
    
    });
    
     
       const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '35m' });

     
       const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
       
       
       user.refreshToken = refreshToken;
       await user.save();

       user.password = undefined;

  
    res.status(201).json({user, accessToken});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

