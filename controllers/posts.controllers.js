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
        .sort({"createdAt": -1})
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


// @desc        Send put
// @route       PUT /api/posts/:id
// @access      Private
exports.sendPut = asyncHandler( async (req, res, next) => {
    const postId = req.params.id;
    const user = req.session.user._id;

    /*
    *   Если есть .likes или .likes включает postId
    */
    const isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
    const option = isLiked ? "$pull" : "$addToSet";

    /*
    *   Оператор $addToSet добавляет или добавляет значение в массив,
    *   только если значение не существует в массиве. $addToSet возвращает
    *   тот же массив без изменения, когда значение уже находится в массиве.
    *
    *   В MongoDB оператор $pull используется для удаления всех экземпляров
    *   значения из существующего массива.
    */

    // Insert user like
    req.session.user = await User.findByIdAndUpdate(user, { [option]: {likes: postId} }, { new: true })

    // Insert post like

    if(postId){
        return res.status(200).send(postId);
    }

});