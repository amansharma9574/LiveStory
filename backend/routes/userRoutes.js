const express = require('express');
const { createUser } = require('../controllers/signUpController');
const { login } = require('../controllers/loginController');
const { servePost} = require|('../')



const router = express.Router();

router.post('/api/signup', createUser);
router.post('/api/login', login);



module.exports = router;
