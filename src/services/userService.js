const { User } = require('../models');

const getUserByEmail = async (emailPassed) => {
  const user = await User.findOne({ where: { email: emailPassed } });

  return user;
};

const createUser = async (req) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getAllUsers = async () => {
  const users = User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const deleteUser = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

module.exports = { getUserByEmail, createUser, getAllUsers, getUserById, deleteUser };
