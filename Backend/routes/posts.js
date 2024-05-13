const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

// save post
router.post('/post/save', async (req, res) => {
    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
            success: "Post saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//get posts

router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});





//update post

router.put('/post/update/:id', async (req, res) => {
    try {
      const updatedPost = await Posts.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // To return the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({
          error: "Post not found"
        });
      }
  
      return res.status(200).json({
        success: "Post updated successfully",
        data: updatedPost 
      });
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error",
        message: err.message
      });
    }
  });




//delete post

router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id).exec();
        
        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.json({
            message: "Delete successful",
            deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            message: "Delete unsuccessful",
            error: err.message
        });
    }
});


/*
router.post('/post/login', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const user = await Posts.findOne({ regno: req.body.regno }).exec();

        if (user) {
            const isPasswordMatch = req.body.pass === user.pass && user.approval === true;

            if (isPasswordMatch) {
                console.log("success");
                
                
                res.status(200).json({ success: "success" });
            } else {
                res.status(400).json({ error: "Password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ error: error.message });
    }
});
*/
  
  

module.exports = router;

