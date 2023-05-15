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

module.exports = { createPost };