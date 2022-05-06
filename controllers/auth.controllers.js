const asyncHandler = require('../middleware/async');
const User = require('../models/user.mongo');
const { validationResult, body} = require('express-validator');


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
    const errors = validationResult(req);

    // Clean up values and reassign them
    Object.keys(req.body).forEach( key => {
        if (!key.startsWith('pass')) {
            let cleanedValue = req.body[key].trim();
            req.body[key] = cleanedValue;
        }
    })

    body(req.body['userName']).not().isEmpty();

    if (!errors.isEmpty()) {
        req.body.errorsMessage = errors.array()
        let payload = req.body
        return res.status(404).render("register", payload)
    }

    const { firstName, lastName, userName, email, password } = req.body

    const user = await User.findOne({
        $or: [
            { username: userName },
            { email: email }
        ]
    }).then( user => {
        console.log(user)
    })

    return res.status(200).render("login")
});


// @desc        Login user
// @route       GET /login
// @access      Public
exports.login = asyncHandler( async (req, res, next) => {
    return res.status(200).render("login")
});