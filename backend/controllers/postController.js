const Post = require("../models/postModel");

const multer = require('multer');
const { uploadOnCloudinary } = require('../utils/cloudinary');
const {upload} = require('../middlewares/multer')
const fs = require('fs');


exports.Post = async (req, res) => {
 
 
   
    try {
        const { user, content, header, category, createdAt } = req.body;

      
        let imageData = null;

        if (req.file) {
          console.log("done")
            const uploadResponse = await uploadOnCloudinary(req.file.path);
            if (uploadResponse) {
              console.log("done2")
                imageData = uploadResponse.url;
            } else {
              
                return res.status(500).json({ error: "Image upload to Cloudinary failed" });
            }
           
        }
      const post = new Post({
        user,
        content,
        header,
        category,
        createdAt,
        image: imageData, 
      });
console.log("done3")

try {
  await post.save();
  console.log("done4");
  res.status(201).json({ message: "Post created", post });
} catch (saveError) {
  console.error("Database save error:", saveError);
  res.status(500).json({ error: "Error saving post to database" });
}

    } catch (error) {
      res.status(400).json({ error: "Server error" });
    }
  };

