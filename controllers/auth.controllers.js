const asyncHandler = require('../middleware/async');
const User = require('../models/user.mongo');
const bcrypt = require('bcryptjs');
const { validationResult, body, check} = require('express-validator');


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

    // Check userName
    body(req.body['userName']).not().isEmpty();

    // Show errors
    if (!errors.isEmpty()) {
        req.body.errorsMessages = errors.array()
        let payload = req.body
        return res.status(404).render("register", payload)
    }

    const { firstName, lastName, userName, email, password } = req.body

    // Check for already exist
    console.log( '-------->', userName, email)
    const user = await User.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    })
        .catch( e => {
            console.log(e) })

    // Create user if OK
    if (!user) {
        // No user found, create
        await User.create({ firstName, lastName, userName, email, password })
            .then( (newUser) => {
                req.session.user = newUser;
                return res.status(200).redirect("/");
            })
            .catch( e => {
                req.body.errorsMessage = e.message
                return res.status(200).render("register", req.body);
            })

    }


});


// @desc        Logout user
// @route       GET /logout
// @access      Public
exports.logout = asyncHandler( async (req, res, next) => {
    if (req.session) {
        req.session.destroy( () => {
            return res.status(200).redirect("/login")
        })
    }
});


// @desc        Log out user
// @route       GET /logout
// @access      Public
exports.login = asyncHandler( async (req, res, next) => {
    return res.status(200).render("login")
});


// @desc        Login user
// @route       POST /login
// @access      Public
exports.loginPost = asyncHandler( async (req, res, next) => {
    const { logUserName, logPassword } = req.body

    if (logUserName && logPassword) {
        const user = await User.findOne({
            $or: [
                { userName: logUserName },
                { email: logUserName }
            ]
        })
            .catch( e => {
                req.body.errorsMessage = e.message
                return res.status(200).render("login", req.body);
            })

        if (user) {
            const compared = await bcrypt.compare(logPassword, user.password);

            if (compared) {
                req.session.user = user;
                return res.status(200).redirect("/");
            }

        } else {
            req.body.errorsMessage = "No such user"
            return res.status(200).render("login", req.body);
        }


    }
});