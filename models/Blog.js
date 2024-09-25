const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    image: { type: String, default: "https://imgs.search.brave.com/zvT2c4UAD649NVLb9Px6BUHTUD0HEMbIy8yyNqiJ1n4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzA0LzI4Lzk2/LzM2MF9GXzUwNDI4/OTYwNV96ZWhKaUsw/dEN1WkxQMk1kZkZC/cGNKZE9WeEtMblhn/MS5qcGc" },
    title: { type: String, required: true },
    body: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Blog', blogSchema);  