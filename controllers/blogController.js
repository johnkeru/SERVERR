const Blog = require("../models/Blog")

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate({ path: 'user', select: '-password' })
        res.json({ blogs })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id)
        if (!blog) return res.status(404).json({ message: 'Blog not found' })
        res.json({ blog })
        // api.get('/blog')
        // .then(res => res.data.blog)
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.createBlog = async (req, res) => {
    try {
        const userId = req.userId
        const body = req.body
        const blog = new Blog(Object.assign(body, { user: userId }))
        const savedBlog = await blog.save()
        res.status(201).json({ blog: savedBlog })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const isBlogExists = await Blog.findById(id)
        if (!isBlogExists) return res.status(404).json({ error: 'Blog not found' })
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })
        res.json({ blog: updatedBlog })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ blog: deletedBlog })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}