const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/rest')
        console.log('Connected to DB')
    } catch (e) {
        console.log(e)
        console.log('Failed to connect to DB')
    }
}