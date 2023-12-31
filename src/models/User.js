module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    displayName: { type: DataTypes.STRING, allowNull: false, field: 'display_name', },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'users',
  },
);

User.associate = (models) => {
  User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blog_posts' });
};

  return User;
};
