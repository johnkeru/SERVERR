const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: { type: String, required: true },
})

module.exports = mongoose.model('Token', tokenSchema);  // Export the model for use in other files.  The model name is 'Token' and the schema is 'tokenSchema'.  This creates a new collection named 'tokens' in the MongoDB database.  The 'token' field is required and will be a string.  The 'tokens' collection will be created in the database if it doesn't already exist.  This schema will be used to store and validate JWT
