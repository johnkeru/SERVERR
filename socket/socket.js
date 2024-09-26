const { Server } = require('socket.io')

module.exports = (server) => {
    const io = new Server(server, { cors: true })
    io.on('connection', (socket) => {
        console.log('a user connected')

    })
}