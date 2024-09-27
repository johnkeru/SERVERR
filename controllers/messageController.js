const Message = require("../models/Message")

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate({ path: 'sender', select: '-password' })
        res.json({ messages })
    } catch (e) {
        console.error(e)
        res.status(500).send('Server Error')
    }
}