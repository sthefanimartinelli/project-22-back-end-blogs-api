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
  const post = await postService.getByPostId(id);
  
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const userLogged = req.user;
  const userId = userLogged.dataValues.id;

  const { title, content } = req.body;
  const post = await postService.updatePost(postId, userId, title, content);

  if (post.type) return res.status(post.type).json({ message: post.message });
  return res.status(200).json(post);
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const userLogged = req.user;
  const userId = userLogged.dataValues.id;

  const { type, message } = await postService.deletePost(postId, userId);

  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const results = await postService.searchPost(q);
  return res.status(200).json(results);
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, searchPost };