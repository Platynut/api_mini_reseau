const {DataTypes} = require('sequelize');
const db = require('./index');

const Post = db.define('Post',{
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    },
    author:{
        type: DataTypes.STRING
    },
    picture: {
        type: DataTypes.STRING
    }
},{
    tableName: "post"
});

module.exports = Post