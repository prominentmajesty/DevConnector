const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');

const post = require('../../models/Post');
const profile = require('../../models/Profile');
const User = require('../../models/User');
const user = require('../../models/User');

// @route   POST api/post
//@desc    Create a Post
//@acess   Public
router.post('/post', [auth, [
    check('text', 'Text is requird').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

   try{
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        });
        const post = await newPost.save();
        res.json(post);
   }catch(err){
       console.error(err);
       res.status(500).send('Server Error');
   }
});

//@route   GET api/post
//@desc    get all post
//@acess   Private
router.get('/', auth, async (req, res) => {
    try{
        const posts = await Post.find().sort({date : -1});
        res.json(posts)
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//@route   GET api/post/:id
//@desc    get post by id
//@acess   Private
router.get('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.json(post);
    }catch(err){
        console.error(err);
        if(err.kind === 'objectId'){
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server Error');
    }
});

//@route   DELETE api/post/:id
//@desc    delete post
//@acess   Private
router.delete('/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg : 'Post not Found'});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg : 'User not Found'});
        }

        await post.remove();
        res.json({msg : 'post removed'});
    }catch(err){
        console.error(err);
        if(err.kind === 'objectId'){
            return res.status(404).json({msg : 'Post not Found'});
        }
        res.status(500).send('Server Error');
    }
});

//@route   PUT api/post/like/:id
//@desc    Like a post
//@acess   Private
router.put('/like/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        //check if the post has already been liked by the user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg : 'Post already liked'});
        }
        post.likes.unshift({user : req.user.id});
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//@route   PUT api/post/unlike/:id
//@desc    Unlike a post
//@acess   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        //check if the post has already been liked by the user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg : 'Post has not yet been liked'});
        }
        
        //Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/post/coment/:id
//@desc    Comment on a post
//@acess   Private
router.post('/coment/:id', [auth, [
    check('text', 'Text is requird').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

   try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComent = new Post({
            text : req.body.text,
            name : user.name,
            avatar : user.avatar,
            user : req.user.id
        });
        post.comments.unshift(newComent);
        post.save();
        res.json(post);
   }catch(err){
       console.error(err);
       res.status(500).send('Server Error');
   }
});

// @route   DELETE api/post/coment/:id/:coment_id
//@desc    Delete Comment
//@acess   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        
        //pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        
        // make sure comment exist
        if(!comment){
            return res.status(404).json({msg : 'Comment does not exist'});
        }

        // Check User
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg : 'User not authorized'});
        }

        //Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);
        post.save();
        res.json(post.comments);

    }catch(err){
        console.error(err);
        res.status(400).send('Server Error');
    } 
});

module.exports = router;