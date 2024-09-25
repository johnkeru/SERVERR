const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to DB')
    } catch (e) {
        console.log(e)
        console.log('Failed to connect to DB')
    }
}