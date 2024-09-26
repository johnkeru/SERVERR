const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    title: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'User'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'Blog'
    },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification', notificationSchema);  