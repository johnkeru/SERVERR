require('dotenv').config()

const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');
const socket = require('./socket/socket');
require('./configs/dbConnect')()

const app = express();
console.log('aewfwe')
app.use(cors({ origin: '*' }))
app.use(express.json())

app.use(userRouter)
app.use(blogRouter)

const server = app.listen(
    5000,
    () => console.log('Server listening on: http://localhost:5000')
)

socket(server)