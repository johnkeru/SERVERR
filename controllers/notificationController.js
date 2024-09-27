const Notification = require("../models/Notification")

exports.getNotifications = async (req, res) => {
    const userId = req.userId
    const notifications = await Notification.find({ owner: userId })
        .populate({ path: 'sender', select: '-password' })
        .populate({ path: 'blog' })
        .sort({ createdAt: -1 })
    res.json({ notifications })
}