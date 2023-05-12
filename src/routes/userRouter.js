const express = require('express');
const userController = require('../controllers/userController');
const { validateDisplayName, validateEmail, 
  validatePassword } = require('../middlewares/validateUserFields');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validateDisplayName, validateEmail, validatePassword, userController.createUser);

router.get('/', validateToken, userController.getAllUsers);

router.get('/:id', validateToken, userController.getUserById);

module.exports = router;