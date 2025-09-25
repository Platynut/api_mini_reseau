const {DataTypes} = require('sequelize');
const db = require('./index');

const Comment = db.define('Comment',{
    idPost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "comment"
});

module.exports = Comment;