const express = require('express');
const app = express();
const router = express.Router();


// controllers
const { sendPosts, getPosts, sendPut } = require("../controllers/posts.controllers")

// routes
router.route('/')
    .get(getPosts)
    .post(sendPosts)

router
    .route('/:id/like')
    .put(sendPut)


module.exports = router;