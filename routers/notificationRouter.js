const { Router } = require('express')
const { getNotifications } = require('../controllers/notificationController')
const auth = require('../middlewares/auth')

const notificationRouter = Router()
notificationRouter.get('/notifications', auth, getNotifications)

module.exports = notificationRouter