const { Router } = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const blogRouter = Router();

blogRouter.get('/blogs', getAllBlogs);
blogRouter.get('/blogs/:id', getBlogById);
blogRouter.post('/blogs', createBlog);
blogRouter.put('/blogs/:id', updateBlog);
blogRouter.delete('/blogs/:id', deleteBlog);

module.exports = blogRouter;