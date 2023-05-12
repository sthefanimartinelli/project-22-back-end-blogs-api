const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categoryService.createCategory(name);

  return res.status(201).json({ ...category.dataValues });
};

module.exports = { createCategory };