const { User } = require('../../models');

const validateLogin = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });

  if (user.email === undefined || user.password !== password) {
    return { type: 404, message: 'Invalid fields' };
  }

  return { type: 200, message: user };
};

module.exports = { validateLogin };