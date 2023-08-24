const express = require('express');
const jwt =require("jsonwebtoken");
const { BlogModel } = require('../model/blog.model'); 

const blogRouter = express.Router();




blogRouter.get('/blogs',  async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});


blogRouter.get('/blogs',  async (req, res) => {
  try {
    const title = req.query.title;
    const blogs = await BlogModel.find({ title });
    res.send(blogs);
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

///////////////////////////////////////////////////
blogRouter.get('/blogs',  async (req, res) => {
  try {
    const category = req.query.category;
    const blogs = await BlogModel.find({ category });
    res.send(blogs);
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

//////////////////////////////////////////////
blogRouter.get('/blogs',  async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order === 'asc' ? 1 : -1;
    const blogs = await BlogModel.find().sort({ [sort]: order });
    res.send(blogs);
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

/////////////////////////////////////////////////
blogRouter.post('/blogs',  async (req, res) => {
  try {
    const { username, title, content, category } = req.body;
    const newBlog = new BlogModel({
      username,
      title,
      content,
      category,
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
    });
    await newBlog.save();
    res.send({ message: 'Blog created successfully' });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

//////////////////////////////////////////////////
blogRouter.put('/blogs/:id',  async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.userId;
    const { title, content, category } = req.body;

    const blog = await BlogModel.findOne({ _id: blogId, username: userId });

    if (!blog) {
      return res.send({ message: 'Blog not found or unauthorized' });
    }

    blog.title = title;
    blog.content = content;
    blog.category = category;

    await blog.save();

    res.send({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

/////////////////////////////////////////////////
blogRouter.delete('/blogs/:id',  async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await BlogModel.findOne({ _id: blogId, username: userId });

    if (!blog) {
      return res.send({ message: 'Blog not found or unauthorized' });
    }

    await blog.remove();

    res.send({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

///////////////////////////////////////////////////////
blogRouter.patch('/blogs/:id/like',  async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.send({ message: 'Blog not found' });
    }

    blog.likes += 1;
    await blog.save();

    res.send({ message: 'Blog liked successfully' });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

////////////////////////////////////////////////////////////////

blogRouter.patch('/blogs/:id/comment',  async (req, res) => {
  try {
    const blogId = req.params.id;
    const { username, content } = req.body;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.send({ message: 'Blog not found' });
    }

    blog.comments.push({ username, content });
    await blog.save();

    res.send({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.send({ message: 'Internal Server Error' });
  }
});

module.exports={
    blogRouter
}
