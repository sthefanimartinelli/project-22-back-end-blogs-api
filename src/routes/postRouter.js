const express = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../auth/validateToken');
const { validatePostFields } = require('../middlewares/validatePostFields');

const router = express.Router();

router.post('/', validateToken, validatePostFields, postController.createPost);

module.exports = router;