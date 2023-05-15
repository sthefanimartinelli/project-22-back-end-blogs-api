const express = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../auth/validateToken');
const { validatePostFields } = require('../middlewares/validatePostFields');

const router = express.Router();

router.post('/', validateToken, validatePostFields, postController.createPost);

router.get('/', validateToken, postController.getAllPosts);

router.get('/:id', validateToken, postController.getPostById);

module.exports = router;