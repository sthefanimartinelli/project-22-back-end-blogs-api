const express = require('express');
const categoryController = require('../controllers/categoryController');
const validateToken = require('../auth/validateToken');
const { validateName } = require('../middlewares/validateCategoryFields');

const router = express.Router();

router.post('/', validateToken, validateName, categoryController.createCategory);

router.get('/', validateToken, categoryController.getAllCategories);

module.exports = router;