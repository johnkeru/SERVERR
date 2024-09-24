const { Router } = require('express')
const { register, login, currentUser } = require('../controllers/userController')
const auth = require('../middlewares/auth')

const userRouter = Router()

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/currentUser', auth, currentUser)

module.exports = userRouter;