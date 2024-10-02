const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  email: { type: String, required: true, index: true },
  name: { type: String, required: true},
  refreshToken: { type: String } 
});


const User = mongoose.model('User', userSchema);

module.exports = User;
