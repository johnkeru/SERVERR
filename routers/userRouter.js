const { Router } = require('express')
const { register, login, currentUser, logout } = require('../controllers/userController')
const auth = require('../middlewares/auth')

const userRouter = Router()

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/currentUser', auth, currentUser)
userRouter.get('/logout', auth, logout)

module.exports = userRouter;