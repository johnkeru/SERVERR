const { Router } = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, toggleLike, blogLikes } = require('../controllers/blogController');
const auth = require('../middlewares/auth')

const blogRouter = Router();

blogRouter.get('/blogs', auth, getAllBlogs);
blogRouter.get('/blogs/:id', auth, getBlogById);
blogRouter.post('/blogs', auth, createBlog);
blogRouter.put('/blogs/:id', auth, updateBlog);
blogRouter.delete('/blogs/:id', auth, deleteBlog);

blogRouter.post('/blogs/:id/like', auth, toggleLike)
blogRouter.get('/blogs/:id/likes', auth, blogLikes)

module.exports = blogRouter;