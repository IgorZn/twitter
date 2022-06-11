const asyncHandler = require('../middleware/async');
const Post = require('../models/post.mongo');
const User = require('../models/user.mongo');

// @desc        Get posts
// @route       GET /api/posts
// @access      Public
exports.getPosts = asyncHandler( async (req, res, next) => {
    Post.find()
        .populate({
            path: 'postedBy',
        })
        .then(results => res.status(200).send(results))
        .catch( error => {
            console.log(error);
            res.sendStatus(400);
        })
});


// @desc        Send post
// @route       POST /api/posts
// @access      Private
exports.sendPosts = asyncHandler( async (req, res, next) => {
    if (!req.body.content) {
        console.log('Content param not specified')
        return res.status(400).send("it's NOT worked!")
    };

    const newPost = await Post.create({
        content: req.body.content,
        postedBy: req.session.user
    })
        .catch( e => {
            console.log('Post creation error:', e)
        });

    const newPostPop = await newPost.populate({
            path: 'postedBy',
        })

    if(newPostPop) {
        return res.status(201).send(newPost);
    };
});