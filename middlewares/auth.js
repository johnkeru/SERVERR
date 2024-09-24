const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ error: 'Unauthorized' })
    const token = authHeader.split(' ')[1]
    if (!jwt.verify(token, 'signature'))
        return res.status(401).json({ error: 'Invalid token' })
    const payload = jwt.decode(token)
    req.userId = payload.userId
    next()
}