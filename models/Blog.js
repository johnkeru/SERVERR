const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    image: String,
    title: { type: String, required: true },
    body: String,
    createdAt: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true, ref: 'User'
        }
    ],
    // ADDED THIS FOR FAST PERFORMANCE
    likesCount: { type: Number, default: 0 }
})

module.exports = mongoose.model('Blog', blogSchema);  