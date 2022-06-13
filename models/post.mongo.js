const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    pinned: Boolean,
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);