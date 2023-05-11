const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const doLogin = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const { email, password } = req.body;
  const { type, message } = await loginService.getLogin(email, password);

  if (type) return res.status(type).json({ message });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = { doLogin };