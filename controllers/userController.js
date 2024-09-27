const BlackListedToken = require('../models/BlackListedToken')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ field: 'username', message: 'No user found!' })
        if (!user.comparePassword(password)) return res.status(404).json({ field: 'password', message: 'Incorrect password!' })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '3d' })
        res.json({ token })
    } catch (e) {
        return res.status(500).json({ error: 'Something went wrong, Please try again later.' })
    }
}

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body
        const newUser = await User({ username, password })
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: '3d' })
        res.json({ token })
    } catch (e) {
        if (e.errorResponse.code === 11000) {
            return res.status(500).json({ field: 'username', message: 'Username must be unique!' })
        }
        return res.status(500).json({ error: 'Something went wrong, Please try again later.' })
    }
}

exports.currentUser = async (req, res) => {
    const userId = req.userId
    const user = await User.findById(userId).select('-password')
    res.json({ user })
}

exports.logout = async (req, res) => {
    const token = req.token
    const blackListedToken = new BlackListedToken({ token })
    await blackListedToken.save()
    res.json({ message: 'User successfully logged out' })
}

