const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))


app.get('/', (req, res) => {
    res.json({ message: 'Hello from server' })
})

app.listen(
    5000,
    () => console.log('Server listening on: http://localhost:5000')
)