const Blog = require("../models/Blog")

exports.getAllBlogs = async (req, res) => {
    try {
        const limit = 2;
        let lastId = req.query?.lastId;

        // Define the query to fetch blogs
        let query = {};
        if (lastId) {
            // If `lastId` is provided, fetch blogs with _id less than lastId for pagination
            query = { _id: { $lt: lastId } };
        }

        // Fetch blogs from the database
        let blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate({ path: 'user', select: '-password' });

        const hasMore = blogs.length === limit;
        res.json({ blogs, hasMore });
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findById(id).populate({ path: 'user', select: '-password' })
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

exports.toggleLike = async (req, res) => {
    try {
        const userId = req.userId
        const blogId = req.params.id
        let isLike = false;
        const blog = await Blog.findById(blogId)
        if (!blog) return res.status(404).json({ error: 'Blog not found' })
        // check if user alread like the blog
        const isUserAlreadyLiked = blog.likes.includes(userId)
        if (isUserAlreadyLiked) {
            blog.likesCount = blog.likesCount - 1
            blog.likes = blog.likes.filter(likeUserId => likeUserId.toString() !== userId)
        }
        else {
            blog.likesCount = blog.likesCount + 1
            blog.likes.push(userId)
            isLike = true
        }
        // before save
        await blog.save()
        res.json({ likesCount: blog.likesCount, isLike })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

exports.blogLikes = async (req, res) => {
    try {
        const blogId = req.params.id
        const blog = await Blog.findById(blogId).populate('likes', '-password')
        res.json({ likes: blog.likes })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}