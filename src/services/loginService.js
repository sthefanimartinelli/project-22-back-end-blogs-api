const { User } = require('../models');
// const { validateLogin } = require('./validations/validateLogin');

const getLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return { type: 400, message: 'Invalid fields' };
  }

  return { type: null, message: '' };
};

module.exports = { getLogin };
