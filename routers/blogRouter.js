const { Router } = require('express');
const { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const blogRouter = Router();

blogRouter.get('/blogs', getAllBlogs);
blogRouter.get('/blogs/:id', getBlog);
blogRouter.post('/blogs', createBlog);
blogRouter.put('/blogs/:id', updateBlog);
blogRouter.delete('/blogs/:id', deleteBlog);

module.exports = blogRouter;