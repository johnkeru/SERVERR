const Blog = require("../models/Blog")

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.json({ blogs })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.getBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) return res.status(404).json({ message: 'Blog not found' })
        res.json(blog)
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.createBlog = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.updateBlog = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.deleteBlog = async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}