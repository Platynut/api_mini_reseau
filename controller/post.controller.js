const Post = require('../model/post.model');


exports.getAll = async (req, res) => {
    try {
        let postList = await Post.findAll();
        res.status(200).json(postList);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les posts" })
    }
}

exports.getById = async (req, res) => {
    try {
        let post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        post.picture = "http://localhost:3000/images/" + post.picture;
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les posts" })
    }
}

exports.create = async (req, res) => {
    try {
        console.log("req.token:", req.token)
        let post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.token.id
        });
        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de créer le post!" })
    }
}

exports.update = async (req, res, next) => {
    try {
        let post = await Post.findOne({
            where: {
                id: req.params.id
            }
        });
        if(req.token.id !== post.userId){
            return res.status(403).json('Vous n\'avez pas les droits pour modifier ce post');
        }
        if(req.body.title){
            post.title = req.body.title;
        }
        if(req.body.content){
            post.content = req.body.content;
        }
        if(req.body.author){
            post.author = req.body.author;
        }
        post.save();
        res.status(201).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de modifier ce post" })
    }
}

exports.delete = async (req, res) => {
    try {
        let post = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(post);
    } catch (e) {
        res.status(400).json({ error: "Impossible de supprimer ce post" })
    }
}

