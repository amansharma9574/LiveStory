const multer = require('multer');
const { uploadOnCloudinary } = require('../utils/cloudinary.js');
const { unlinkSync } = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });

  module.exports = { upload };