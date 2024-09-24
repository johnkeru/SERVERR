const { Router } = require('express')
const { register, login } = require('../controllers/userController')

const userRouter = Router()

userRouter.post('/register', register);
userRouter.post('/login', login);

module.exports = userRouter;