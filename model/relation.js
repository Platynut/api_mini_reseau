const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

const relate = async () => {
    await Post.belongsTo(User, {foreignKey: "userId"});
    await Comment.belongsTo(User, {foreignKey: "userId"});
    await Comment.belongsTo(Post, {foreignKey: "idPost"});
}

module.exports = relate;