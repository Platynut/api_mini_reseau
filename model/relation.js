const User = require('./user.model');
const Post = require('./post.model');

const relate = async () => {
    await Post.belongsTo(User, {foreignKey: "userId"});
}

module.exports = relate;