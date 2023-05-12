const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const createUser = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);

  if (user) return res.status(409).json({ message: 'User already registered' });

  await userService.createUser(req);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);

  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  // try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  // } catch (error) {
  //   console.log(error.message);
  //   return res.status(500).json({ message: 'An error has occurred' });
  // }
};

module.exports = { createUser, getAllUsers };