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
  try {
    const users = await userService.getAllUsers();
    const usersWithoutPassword = users.map((user) => {
      const { id, displayName, email, image } = user;
      return { id, displayName, email, image };
    });

    return res.status(200).json(usersWithoutPassword);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'An error has occurred' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  const { displayName, email, image } = user;
  const userWithoutPassword = { id: numberId, displayName, email, image };

  return res.status(200).json(userWithoutPassword);
};

const deleteUser = async (req, res) => {
  const userLogged = req.user;
  const userId = userLogged.dataValues.id;

  await userService.deleteUser(userId);

  return res.status(204).end();
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };