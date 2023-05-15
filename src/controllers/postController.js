const postService = require('../services/postService');

const createPost = async (req, res) => {
 const { title, content, categoryIds } = req.body;
 const userLogged = req.user;
 const userId = userLogged.dataValues.id;
 const post = await postService.createPost(title, content, categoryIds, userId);
 const { type, message } = post;
 if (type) return res.status(type).json({ message });
 return res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = await postService.getByPostId(id);
  
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

module.exports = { createPost, getAllPosts, getPostById };