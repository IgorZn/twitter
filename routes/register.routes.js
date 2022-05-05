const express = require('express');
const app = express();
const router = express.Router();
const { check } = require('express-validator');

const { register, postReg } = require("../controllers/auth.controllers");

app.set('view engine', 'pug');
app.set('views', 'views');

let minLength = 3;

router.route('/')
    .get(register)
    .post(
        check('firstName').trim().isLength({ min: 1 }).withMessage(`A first name is required, minimum length is ${minLength}`),
        check('userName').trim().isLength({ min: 3 }).withMessage(`A user name is required, minimum length is ${minLength}`),
        check('password').isLength({ min: 3 }),

        postReg
    )


module.exports = router;