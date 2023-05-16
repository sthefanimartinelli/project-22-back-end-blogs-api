const express = require('express');
const postController = require('../controllers/postController');
const validateToken = require('../auth/validateToken');
const { validatePostFields } = require('../middlewares/validatePostFields');
const { validateAlterPostFields } = require('../middlewares/validateAlterPostFields');

const router = express.Router();

router.get('/search', validateToken, postController.searchPost);

router.post('/', validateToken, validatePostFields, postController.createPost);

router.get('/', validateToken, postController.getAllPosts);

router.get('/:id', validateToken, postController.getPostById);

router.put('/:id', validateAlterPostFields, validateToken, postController.updatePost);

router.delete('/:id', validateToken, postController.deletePost);

module.exports = router;