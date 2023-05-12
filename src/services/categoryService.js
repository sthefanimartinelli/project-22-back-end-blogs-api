const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

module.exports = { createCategory, getAllCategories };