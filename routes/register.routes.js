const express = require('express');
const app = express();
const router = express.Router();

const { register, postReg } = require("../controllers/auth.controllers");

app.set('view engine', 'pug');
app.set('views', 'views');

router.route('/')
    .get(register)
    .post(postReg)


module.exports = router;