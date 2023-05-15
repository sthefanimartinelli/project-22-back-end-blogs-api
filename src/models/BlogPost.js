module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      title: { type: DataTypes.STRING, allowNull: false, },
      content: { type: DataTypes.STRING, allowNull: false, },
      userId: { type: DataTypes.INTEGER, },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'blog_posts',
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};
