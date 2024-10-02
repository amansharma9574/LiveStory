const express = require('express');
const {Post} = require('../controllers/postController');
const {servePost} = require('../controllers/servePostController');
const {fullPost } = require('../controllers/fullPostController')
const { upload } = require('../middlewares/multer');
const router = express.Router();

router.post('/api/post',upload.single('image'), Post);
router.post('/api/servepost', servePost);
router.post('/api/fullpost', fullPost);

module.exports = router;