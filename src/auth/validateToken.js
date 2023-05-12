const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

module.exports = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const email = JSON.parse(decoded.data.email);
    console.log(email);
    const user = await userService.getUserByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'XABLAU' });
  }
};