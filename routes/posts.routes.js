const express = require('express');
const app = express();
const router = express.Router();


// controllers
const { sendPosts } = require("../controllers/posts.controllers")

// routes
router.route('/')
    .post(sendPosts)


module.exports = router;