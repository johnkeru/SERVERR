const { Server } = require('socket.io')
const Notification = require('../models/Notification')

module.exports = (server) => {
    const io = new Server(server, { cors: true })
    io.on('connection', (socket) => {
        // WHEN A USER LOGGED IN IT AUTOMATICALLY CREATE A ROOM FOR NOTIFICATION (notification-userId)
        socket.on('create-room-notification', (userId) => {
            socket.join(`notification-${userId}`)
        })

        socket.on('notification', async ({ title, sender, blog }) => {
            const newNotification = new Notification({ title, sender: sender._id, owner: blog.user._id, blog: blog._id })
            await newNotification.save()
            io.to(`notification-${blog.user._id}`).emit('notification', newNotification)
        })
    })
}