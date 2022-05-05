const asyncHandler = require('../middleware/async');
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

    console.log('cleaned body -->', req.body);
    body(req.body['userName']).not().isEmpty();

    if (!errors.isEmpty()) {
        console.log()
        req.body.errorsMessage = errors.array()
        let payload = req.body
        console.log(req.body)
        return res.status(404).render("register", payload)
    }
    return res.status(200).render("login")
});


// @desc        Login user
// @route       GET /login
// @access      Public
exports.login = asyncHandler( async (req, res, next) => {
    return res.status(200).render("login")
});