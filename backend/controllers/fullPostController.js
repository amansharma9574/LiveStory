
const Post = require('../models/postModel');


exports.fullPost = async (req, res) => {

    const {_id} = req.body;


    try { 
        const post = await Post.findOne({_id});
        res.json({post});
        
    }
    catch (error){
        res.status(500).json({ error: 'Server error' });
    }

};