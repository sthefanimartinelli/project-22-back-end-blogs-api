const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/config');
const { Category, BlogPost, PostCategory, User } = require('../models');

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

// const createPostCategories = async (postId, categoryIds) => {
//   const newArray = categoryIds.map((categoryId) => ({ postId, categoryId }));
//   await PostCategory.bulkCreate(newArray);
// };

const verifyCategories = async (categoryIds) => {
  const allCategories = await Category.findAll();
  const categoriesIds = allCategories.map((category) => category.id);

  if (categoriesIds.length === 0) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }

  for (let index = 0; index < categoryIds.length; index += 1) {
    if (!categoriesIds.includes(categoryIds[index])) {
      return { type: 400, message: 'one or more "categoryIds" not found' };
    }
  }
};

// const createPost = async (title, content, categoryIds, userId) => {
//   await verifyCategories(categoryIds);
//   const now = new Date();
//   const newPost = await BlogPost
//     .create({ title, content, userId, published: now.toISOString(), updated: now.toISOString() });
//   const postId = newPost.id;
//   await createPostCategories(postId, categoryIds);
//   return newPost;
// };

const createPost = async (title, content, categoryIds, userId) => {
  const categoriesNotOk = await verifyCategories(categoryIds);
  if (categoriesNotOk) return categoriesNotOk;
  const now = new Date();
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ 
      title, content, userId, published: now.toISOString(), updated: now.toISOString(),
    }, { transaction: t });
    
    const postId = newPost.id;
    const newArray = categoryIds.map((categoryId) => ({ postId, categoryId }));
    await PostCategory.bulkCreate(newArray, { transaction: t });

    return newPost;
  });
  
  return result;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll(
    {
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    },
);
    return posts;
};

const getByPostId = async (id) => {
  const post = await BlogPost.findOne(
    { where: { id },
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    },
  );
  return post;
};

const updatePost = async (postId, userId, title, content) => {
  const post = await getByPostId(postId);
  if (post.userId !== userId) return { type: 401, message: 'Unauthorized user' };
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const updatedPost = await getByPostId(postId);
  return updatedPost;
};

const deletePost = async (postId, userId) => {
  const post = await getByPostId(postId);
  if (!post) return { type: 404, message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 401, message: 'Unauthorized user' };
  await BlogPost.destroy({ where: { id: postId } });
  return { type: null, message: '' };
};

const searchPost = async (q) => {
  const search = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });
  return search;
};

module.exports = { createPost, getAllPosts, getByPostId, updatePost, deletePost, searchPost };