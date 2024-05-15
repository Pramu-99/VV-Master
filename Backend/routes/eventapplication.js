const express = require('express');
const Posts = require('../models/eventapplication');
const router = express.Router();

router.post('/apply/save', async (req, res) => {
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
router.get('/applies', async (req, res) => {
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

router.put('/apply/update/:id', async (req, res) => {
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
        data: updatedPost // Using 'data' key for consistency in response
      });
    } catch (err) {
      return res.status(500).json({
        error: "Internal server error",
        message: err.message
      });
    }
  });

 router.delete('/apply/delete/:id', async (req, res) => {
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
