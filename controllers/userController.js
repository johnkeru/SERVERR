const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ field: 'username', message: 'No user found!' })
        if (!user.comparePassword(password)) return res.status(404).json({ field: 'password', message: 'Incorrect password!' })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '2h' })
        res.json({ token })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Something went wrong, Please try again later.' })
    }
}

exports.register = async (req, res) => {
    try {
        const { username, password, confirm_password } = req.body
        if (password !== confirm_password) return res.json({ field: 'confirm_password', message: 'Passwords do not match' })
        const newUser = await User({ username, password })
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: '2h' })
        res.json({ token })
    } catch (e) {
        return res.status(500).json({ error: 'Something went wrong, Please try again later.' })
    }
}

exports.currentUser = async (req, res) => {
    const userId = req.userId
    const user = await User.findById(userId).select('-password')
    res.json({ user })
}

