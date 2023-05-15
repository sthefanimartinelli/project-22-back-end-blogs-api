// const Sequelize = require('sequelize');
// const { now } = require('sequelize/types/utils');
// const config = require('../config/config');
const { Category, BlogPost, PostCategory } = require('../models');

// const env = process.env.NODE_ENV;

// const sequelize = new Sequelize(config[env]);

const createPostCategories = async (postId, categoryIds) => {
  const newArray = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(newArray);
};

const createPost = async (title, content, categoryIds, userId) => {
  const allCategories = await Category.findAll();
  const categoriesIds = allCategories.map((category) => category.id);

  if (categoriesIds.length === 0) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }

  console.log(categoriesIds);
  for (let index = 0; index < categoryIds.length; index += 1) {
    if (!categoriesIds.includes(categoryIds[index])) {
      return { type: 400, message: 'one or more "categoryIds" not found' };
    }
  }

  const now = new Date();

  const newPost = await BlogPost
    .create({ title, content, userId, published: now.toISOString(), updated: now.toISOString() });

  const postId = newPost.id;
  await createPostCategories(postId, categoryIds);

  return newPost;
};

module.exports = { createPost };