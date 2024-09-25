const { Router } = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const auth = require('../middlewares/auth')

const blogRouter = Router();

blogRouter.get('/blogs', auth, getAllBlogs);
blogRouter.get('/blogs/:id', auth, getBlogById);
blogRouter.post('/blogs', auth, createBlog);
blogRouter.put('/blogs/:id', auth, updateBlog);
blogRouter.delete('/blogs/:id', auth, deleteBlog);

module.exports = blogRouter;