const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === undefined) {
    return res.status(400)
      .json({ message: '"name" is required' });
  }
  next();
};

module.exports = { validateName };