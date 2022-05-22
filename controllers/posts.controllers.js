const asyncHandler = require('../middleware/async');

// @desc        Get posts
// @route       GET /api/posts
// @access      Public
exports.getPosts = asyncHandler( async (req, res, next) => {
    return res.status(200).render("register")
});


// @desc        Send post
// @route       POST /api/posts
// @access      Private
exports.sendPosts = asyncHandler( async (req, res, next) => {
    if (!req.body.content) {
        console.log('Content param not specified')
        return res.status(400).send("it's NOT worked!")
    }
    res.status(200).send("it worked!")


});