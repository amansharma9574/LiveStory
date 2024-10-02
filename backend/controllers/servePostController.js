const Post = require('../models/postModel');

exports.servePost = async (req, res) => {

    const sliceContent = (content, wordLimit) => {
        if (content.length > wordLimit)
            {
                return content.slice(0, wordLimit) + '...';
                
            }
    }

    try{

        const {page} = req.body
        const posts = await Post.find({});

        const slicedContent = posts.map(post => {
              post.content = sliceContent(post.content, 72);
            
            return post;
          });
          res.status(200).json(slicedContent);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });

    }

}