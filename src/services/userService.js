const { User } = require('../models');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const createUser = async (req) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

module.exports = { getUserByEmail, createUser };
