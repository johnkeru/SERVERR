const { Server } = require('socket.io')
const Notification = require('../models/Notification')
const Message = require('../models/Message')

module.exports = (server) => {
    const io = new Server(server, { cors: true })
    io.on('connection', async (socket) => {
        // socket.on('joinRoom', id => socket.join(id))
        // const messages = await Message.find()
        // io.to(socket.id).emit('initialMessages', messages)

        // WHEN A USER LOGGED IN IT AUTOMATICALLY CREATE A ROOM FOR NOTIFICATION (notification-userId)
        socket.on('create-room-notification', (userId) => {
            socket.join(`notification-${userId}`)
        })

        socket.on('notification', async ({ title, sender, blog }) => {
            const newNotification = new Notification({ title, sender: sender._id, owner: blog.user._id, blog: blog._id })
            await newNotification.save()
            io.to(`notification-${blog.user._id}`).emit('notification', newNotification)
        })

        socket.on('message', async ({ message, sender }) => {
            const newMessage = new Message({ message, sender })
            await newMessage.save()
            io.emit('message', newMessage)
        })
    })
}