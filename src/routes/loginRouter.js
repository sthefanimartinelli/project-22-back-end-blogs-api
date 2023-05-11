const express = require('express');
const loginController = require('../controllers/loginController');
const { validateLoginFields } = require('../middlewares/validateLoginFields');

const router = express.Router();

router.post('/', validateLoginFields, loginController.doLogin);

module.exports = router;