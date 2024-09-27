const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: { type: String, required: true },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: 'User'
    },
    image: String,
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Message', messageSchema);  