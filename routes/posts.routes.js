const express = require('express');
const app = express();
const router = express.Router();


// controllers
const { sendPosts, getPosts } = require("../controllers/posts.controllers")

// routes
router.route('/')
    .get(getPosts)
    .post(sendPosts)


module.exports = router;