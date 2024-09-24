const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})
// user.save()
userSchema.pre('save', async function (next) {
    try {
        const user = this
        const hashPassword = await bcrypt.hash(user.password, 10)
        user.password = hashPassword
        next()
    } catch (err) {
        next(err)
    }
})

// user.comparePassword()
userSchema.methods.comparePassword = function (password) {
    const isMatch = bcrypt.compareSync(password, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema);