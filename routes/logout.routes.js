const {
    logout,
} = require("../controllers/auth.controllers");


const express = require('express');
const app = express();
const router = express.Router();

app.set('view engine', 'pug');
app.set('views', 'views');

router.route('/')
    .get(logout)


module.exports = router;