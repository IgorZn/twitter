const asyncHandler = require('../middleware/async');

// @desc        Register user
// @route       GET /register
// @access      Public
exports.register = asyncHandler( async (req, res, next) => {
    return res.status(200).render("register")
});

// @desc        Register user
// @route       POST /register
// @access      Public
exports.postReg = asyncHandler( async (req, res, next) => {
    console.log(req.body)
    return res.status(200).render("login")
});


// @desc        Login user
// @route       GET /login
// @access      Public
exports.login = asyncHandler( async (req, res, next) => {
    return res.status(200).render("login")
});