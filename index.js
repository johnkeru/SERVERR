require('dotenv').config()

const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/useRouter');
require('./configs/dbConnect')()

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())

app.use(userRouter)
app.listen(
    5000,
    () => console.log('Server listening on: http://localhost:5000')
)