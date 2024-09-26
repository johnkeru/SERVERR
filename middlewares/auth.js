const jwt = require('jsonwebtoken')
const BlackListedToken = require('../models/BlackListedToken')

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ error: 'Unauthorized' })
        const token = authHeader.split(' ')[1]
        if (!jwt.verify(token, process.env.JWT_KEY))
            return res.status(401).json({ error: 'Invalid token' })
        const blackListedTokens = await BlackListedToken.findOne({ token })
        if (blackListedTokens)
            return res.status(401).json({ error: 'Token blacklisted' })
        const payload = jwt.decode(token)
        req.userId = payload.userId
        req.token = token
        next()
    } catch (e) {
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}